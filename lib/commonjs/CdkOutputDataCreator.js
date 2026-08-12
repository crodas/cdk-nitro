"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CdkOutputDataCreator = void 0;
var _cashuTs = require("@cashu/cashu-ts");
/**
 * cashu-ts-compatible adapter over the native Nitro OutputDataCreator.
 *
 * Wraps the native (CDK Rust) blinding results in cashu-ts `OutputData`
 * instances so the module can be injected wherever cashu-ts expects an
 * `OutputDataCreator`, such as Coco's `outputDataCreator` seam. The native
 * crypto is reused verbatim; this layer only converts types across the
 * boundary.
 */

/**
 * The subset of the native Nitro OutputDataCreator this adapter drives. Kept
 * structural so a stand-in can be injected in tests.
 */

const textEncoder = new TextEncoder();
function toArrayBuffer(seed) {
  // Copy so a view with a byte offset or a shared buffer is passed as an exact,
  // standalone ArrayBuffer.
  return seed.slice().buffer;
}
function toNativeAmount(amount) {
  return _cashuTs.Amount.from(amount).toNumber();
}
function toNativeSplit(customSplit) {
  return customSplit?.map(a => _cashuTs.Amount.from(a).toNumber());
}
function toKeyEntries(keyset) {
  return Object.entries(keyset.keys).map(([amount, pubkey]) => ({
    amount: Number(amount),
    pubkey
  }));
}
function toNativeSigFlag(sigFlag) {
  return sigFlag === 'SIG_ALL' ? 'SigAll' : 'SigInputs';
}
function toNativeP2PK(p2pk) {
  // NUT-10/11 (cashu-ts 5.x): `kind` selects P2PK vs HTLC, the receiver pubkey
  // lives in `data`, and `pubkeys` holds only the additional multisig keys.
  if (p2pk.kind === 'HTLC') {
    throw new Error('HTLC spending conditions are not supported by the native OutputDataCreator');
  }
  if (p2pk.blindKeys) {
    throw new Error('blindKeys (P2BK) is not supported by the native OutputDataCreator');
  }
  if (p2pk.additionalTags !== undefined && p2pk.additionalTags.length > 0) {
    throw new Error('additionalTags are not supported by the native OutputDataCreator');
  }
  if (!p2pk.data) {
    throw new Error('P2PK requires a recipient pubkey in the data field');
  }
  return {
    pubkey: p2pk.data,
    additionalPubkeys: p2pk.pubkeys,
    numSigs: p2pk.requiredSignatures,
    locktime: p2pk.locktime,
    refundPubkeys: p2pk.refundKeys,
    numSigsRefund: p2pk.requiredRefundSignatures,
    sigFlag: p2pk.sigFlag === undefined ? undefined : toNativeSigFlag(p2pk.sigFlag)
  };
}

/**
 * Wrap a native blinding result in a cashu-ts OutputData. `B_` is the native
 * compressed-hex point, the blinding factor is the native scalar hex read as a
 * big-endian bigint, and the secret is the UTF-8 bytes of the native secret
 * string, matching cashu-ts's own encoding so `toProof` unblinds correctly.
 */
function wrap(native) {
  const blindedMessage = {
    amount: _cashuTs.Amount.from(native.amount),
    B_: native.blindedSecret,
    id: native.keysetId
  };
  const blindingFactor = BigInt(`0x${native.blindingFactor}`);
  const secret = textEncoder.encode(native.secret);
  return new _cashuTs.OutputData(blindedMessage, blindingFactor, secret);
}

/**
 * cashu-ts-compatible OutputDataCreator backed by the native CDK Rust crypto.
 * Construct it with the native HybridObject (or a compatible stand-in) and use
 * it anywhere cashu-ts expects an OutputDataCreator.
 */
class CdkOutputDataCreator {
  constructor(native) {
    this.native = native;
  }
  createRandomData(amount, keyset, customSplit) {
    return this.native.createRandomData(toNativeAmount(amount), keyset.id, toKeyEntries(keyset), toNativeSplit(customSplit)).map(wrap);
  }
  createSingleRandomData(amount, keysetId) {
    return wrap(this.native.createSingleRandomData(toNativeAmount(amount), keysetId));
  }
  createP2PKData(p2pk, amount, keyset, customSplit) {
    return this.native.createP2PKData(toNativeP2PK(p2pk), toNativeAmount(amount), keyset.id, toKeyEntries(keyset), toNativeSplit(customSplit)).map(wrap);
  }
  createSingleP2PKData(p2pk, amount, keysetId) {
    return wrap(this.native.createSingleP2PKData(toNativeP2PK(p2pk), toNativeAmount(amount), keysetId));
  }
  createDeterministicData(amount, seed, counter, keyset, customSplit) {
    return this.native.createDeterministicData(toNativeAmount(amount), toArrayBuffer(seed), counter, keyset.id, toKeyEntries(keyset), toNativeSplit(customSplit)).map(wrap);
  }
  createSingleDeterministicData(amount, seed, counter, keysetId) {
    return wrap(this.native.createSingleDeterministicData(toNativeAmount(amount), toArrayBuffer(seed), counter, keysetId));
  }
}
exports.CdkOutputDataCreator = CdkOutputDataCreator;
//# sourceMappingURL=CdkOutputDataCreator.js.map