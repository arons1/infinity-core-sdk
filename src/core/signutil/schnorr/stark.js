'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (
                    k !== 'default' &&
                    Object.prototype.hasOwnProperty.call(mod, k)
                )
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.poseidonHashMany =
    exports.poseidonHashSingle =
    exports.poseidonHashFunc =
    exports.poseidonHash =
    exports.poseidonSmall =
    exports.poseidonCreate =
    exports.poseidonBasic =
    exports._poseidonMDS =
    exports.Fp251 =
    exports.Fp253 =
    exports.keccak =
    exports.computeHashOnElements =
    exports.hashChain =
    exports.pedersen =
    exports.getAccountPath =
    exports.ethSigToPrivate =
    exports.getStarkKey =
    exports.grindKey =
    exports.utils =
    exports.Signature =
    exports.ProjectivePoint =
    exports.CURVE =
    exports.verify =
    exports.sign =
    exports.getSharedSecret =
    exports.getPublicKey =
    exports._starkCurve =
        void 0;
/*! micro-starknet - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const sha3_1 = require('@noble/hashes/sha3');
const sha256_1 = require('@noble/hashes/sha256');
const utils_1 = require('@noble/hashes/utils');
const modular_1 = require('./abstract/modular');
const poseidon_1 = require('./abstract/poseidon');
const weierstrass_1 = require('./abstract/weierstrass');
const u = __importStar(require('./abstract/utils'));
const _shortw_utils_1 = require('./_shortw_utils');
const CURVE_ORDER = BigInt(
    '3618502788666131213697322783095070105526743751716087489154079457884512865583',
);
const nBitLength = 252;
function bits2int(bytes) {
    while (bytes[0] === 0) bytes = bytes.subarray(1); // strip leading 0s
    // Copy-pasted from weierstrass.ts
    const delta = bytes.length * 8 - nBitLength;
    const num = u.bytesToNumberBE(bytes);
    return delta > 0 ? num >> BigInt(delta) : num;
}
function hex0xToBytes(hex) {
    if (typeof hex === 'string') {
        hex = strip0x(hex); // allow 0x prefix
        if (hex.length & 1) hex = '0' + hex; // allow unpadded hex
    }
    return u.hexToBytes(hex);
}
const curve = (0, weierstrass_1.weierstrass)({
    a: BigInt(1),
    b: BigInt(
        '3141592653589793238462643383279502884197169399375105820974944592307816406665',
    ),
    // Field over which we'll do calculations; 2n**251n + 17n * 2n**192n + 1n
    // There is no efficient sqrt for field (P%4==1)
    Fp: (0, modular_1.Field)(
        BigInt(
            '0x800000000000011000000000000000000000000000000000000000000000001',
        ),
    ),
    n: CURVE_ORDER,
    nBitLength,
    // Base point (x, y) aka generator point
    Gx: BigInt(
        '874739451078007766457464989774322083649278607533249481151382481072868806602',
    ),
    Gy: BigInt(
        '152666792071518830868575557812948353041420400780739481342941381225525861407',
    ),
    h: BigInt(1),
    lowS: false,
    ...(0, _shortw_utils_1.getHash)(sha256_1.sha256),
    // Custom truncation routines for stark curve
    bits2int,
    bits2int_modN: bytes => {
        // 2102820b232636d200cb21f1d330f20d096cae09d1bf3edb1cc333ddee11318 =>
        // 2102820b232636d200cb21f1d330f20d096cae09d1bf3edb1cc333ddee113180
        const hex = u.bytesToNumberBE(bytes).toString(16); // toHex unpadded
        if (hex.length === 63) bytes = hex0xToBytes(hex + '0'); // append trailing 0
        return (0, modular_1.mod)(bits2int(bytes), CURVE_ORDER);
    },
});
exports._starkCurve = curve;
function ensureBytes(hex) {
    return u.ensureBytes('', typeof hex === 'string' ? hex0xToBytes(hex) : hex);
}
function normPrivKey(privKey) {
    return u.bytesToHex(ensureBytes(privKey)).padStart(64, '0');
}
function getPublicKey(privKey, isCompressed = false) {
    return curve.getPublicKey(normPrivKey(privKey), isCompressed);
}
exports.getPublicKey = getPublicKey;
function getSharedSecret(privKeyA, pubKeyB) {
    return curve.getSharedSecret(normPrivKey(privKeyA), pubKeyB);
}
exports.getSharedSecret = getSharedSecret;
function sign(msgHash, privKey, opts) {
    return curve.sign(ensureBytes(msgHash), normPrivKey(privKey), opts);
}
exports.sign = sign;
function verify(signature, msgHash, pubKey) {
    const sig =
        signature instanceof Signature ? signature : ensureBytes(signature);
    return curve.verify(sig, ensureBytes(msgHash), ensureBytes(pubKey));
}
exports.verify = verify;
const { CURVE, ProjectivePoint, Signature, utils } = curve;
exports.CURVE = CURVE;
exports.ProjectivePoint = ProjectivePoint;
exports.Signature = Signature;
exports.utils = utils;
function extractX(bytes) {
    const hex = u.bytesToHex(bytes.subarray(1));
    const stripped = hex.replace(/^0+/gm, ''); // strip leading 0s
    return `0x${stripped}`;
}
function strip0x(hex) {
    return hex.replace(/^0x/i, '');
}
function numberTo0x16(num) {
    // can't use utils.numberToHexUnpadded: adds leading 0 for even byte length
    return `0x${num.toString(16)}`;
}
// seed generation
function grindKey(seed) {
    const _seed = ensureBytes(seed);
    const sha256mask = 2n ** 256n;
    const limit = sha256mask - (0, modular_1.mod)(sha256mask, CURVE_ORDER);
    for (let i = 0; ; i++) {
        const key = sha256Num(
            u.concatBytes(_seed, u.numberToVarBytesBE(BigInt(i))),
        );
        if (key < limit)
            return (0, modular_1.mod)(key, CURVE_ORDER).toString(16); // key should be in [0, limit)
        if (i === 100000)
            throw new Error('grindKey is broken: tried 100k vals'); // prevent dos
    }
}
exports.grindKey = grindKey;
function getStarkKey(privateKey) {
    return extractX(getPublicKey(privateKey, true));
}
exports.getStarkKey = getStarkKey;
function ethSigToPrivate(signature) {
    signature = strip0x(signature);
    if (signature.length !== 130) throw new Error('Wrong ethereum signature');
    return grindKey(signature.substring(0, 64));
}
exports.ethSigToPrivate = ethSigToPrivate;
const MASK_31 = 2n ** 31n - 1n;
const int31 = n => Number(n & MASK_31);
function getAccountPath(layer, application, ethereumAddress, index) {
    const layerNum = int31(sha256Num(layer));
    const applicationNum = int31(sha256Num(application));
    const eth = u.hexToNumber(strip0x(ethereumAddress));
    return `m/2645'/${layerNum}'/${applicationNum}'/${int31(eth)}'/${int31(eth >> 31n)}'/${index}`;
}
exports.getAccountPath = getAccountPath;
// https://docs.starkware.co/starkex/pedersen-hash-function.html
const PEDERSEN_POINTS = [
    new ProjectivePoint(
        2089986280348253421170679821480865132823066470938446095505822317253594081284n,
        1713931329540660377023406109199410414810705867260802078187082345529207694986n,
        1n,
    ),
    new ProjectivePoint(
        996781205833008774514500082376783249102396023663454813447423147977397232763n,
        1668503676786377725805489344771023921079126552019160156920634619255970485781n,
        1n,
    ),
    new ProjectivePoint(
        2251563274489750535117886426533222435294046428347329203627021249169616184184n,
        1798716007562728905295480679789526322175868328062420237419143593021674992973n,
        1n,
    ),
    new ProjectivePoint(
        2138414695194151160943305727036575959195309218611738193261179310511854807447n,
        113410276730064486255102093846540133784865286929052426931474106396135072156n,
        1n,
    ),
    new ProjectivePoint(
        2379962749567351885752724891227938183011949129833673362440656643086021394946n,
        776496453633298175483985398648758586525933812536653089401905292063708816422n,
        1n,
    ),
];
function pedersenPrecompute(p1, p2) {
    const out = [];
    let p = p1;
    for (let i = 0; i < 248; i++) {
        out.push(p);
        p = p.double();
    }
    // NOTE: we cannot use wNAF here, because last 4 bits will require full 248 bits multiplication
    // We can add support for this to wNAF, but it will complicate wNAF.
    p = p2;
    for (let i = 0; i < 4; i++) {
        out.push(p);
        p = p.double();
    }
    return out;
}
const PEDERSEN_POINTS1 = pedersenPrecompute(
    PEDERSEN_POINTS[1],
    PEDERSEN_POINTS[2],
);
const PEDERSEN_POINTS2 = pedersenPrecompute(
    PEDERSEN_POINTS[3],
    PEDERSEN_POINTS[4],
);
function pedersenArg(arg) {
    let value;
    if (typeof arg === 'bigint') {
        value = arg;
    } else if (typeof arg === 'number') {
        if (!Number.isSafeInteger(arg))
            throw new Error(`Invalid pedersenArg: ${arg}`);
        value = BigInt(arg);
    } else {
        value = u.bytesToNumberBE(ensureBytes(arg));
    }
    if (!(0n <= value && value < curve.CURVE.Fp.ORDER))
        throw new Error(`PedersenArg should be 0 <= value < CURVE.P: ${value}`); // [0..Fp)
    return value;
}
function pedersenSingle(point, value, constants) {
    let x = pedersenArg(value);
    for (let j = 0; j < 252; j++) {
        const pt = constants[j];
        if (pt.equals(point)) throw new Error('Same point');
        if ((x & 1n) !== 0n) point = point.add(pt);
        x >>= 1n;
    }
    return point;
}
// shift_point + x_low * P_0 + x_high * P1 + y_low * P2  + y_high * P3
function pedersen(x, y) {
    let point = PEDERSEN_POINTS[0];
    point = pedersenSingle(point, x, PEDERSEN_POINTS1);
    point = pedersenSingle(point, y, PEDERSEN_POINTS2);
    return extractX(point.toRawBytes(true));
}
exports.pedersen = pedersen;
function hashChain(data, fn = pedersen) {
    if (!Array.isArray(data) || data.length < 1)
        throw new Error('data should be array of at least 1 element');
    if (data.length === 1) return numberTo0x16(pedersenArg(data[0]));
    return Array.from(data)
        .reverse()
        .reduce((acc, i) => fn(i, acc));
}
exports.hashChain = hashChain;
// Same as hashChain, but computes hash even for single element and order is not revesed
const computeHashOnElements = (data, fn = pedersen) =>
    [0, ...data, data.length].reduce((x, y) => fn(x, y));
exports.computeHashOnElements = computeHashOnElements;
const MASK_250 = u.bitMask(250);
const keccak = data =>
    u.bytesToNumberBE((0, sha3_1.keccak_256)(data)) & MASK_250;
exports.keccak = keccak;
const sha256Num = data => u.bytesToNumberBE((0, sha256_1.sha256)(data));
// Poseidon hash
exports.Fp253 = (0, modular_1.Field)(
    BigInt(
        '14474011154664525231415395255581126252639794253786371766033694892385558855681',
    ),
); // 2^253 + 2^199 + 1
exports.Fp251 = (0, modular_1.Field)(
    BigInt(
        '3618502788666131213697322783095070105623107215331596699973092056135872020481',
    ),
); // 2^251 + 17 * 2^192 + 1
function poseidonRoundConstant(Fp, name, idx) {
    const val = Fp.fromBytes(
        (0, sha256_1.sha256)((0, utils_1.utf8ToBytes)(`${name}${idx}`)),
    );
    return Fp.create(val);
}
// NOTE: doesn't check eiginvalues and possible can create unsafe matrix. But any filtration here will break compatibility with starknet
// Please use only if you really know what you doing.
// https://eprint.iacr.org/2019/458.pdf Section 2.3 (Avoiding Insecure Matrices)
function _poseidonMDS(Fp, name, m, attempt = 0) {
    const x_values = [];
    const y_values = [];
    for (let i = 0; i < m; i++) {
        x_values.push(poseidonRoundConstant(Fp, `${name}x`, attempt * m + i));
        y_values.push(poseidonRoundConstant(Fp, `${name}y`, attempt * m + i));
    }
    if (new Set([...x_values, ...y_values]).size !== 2 * m)
        throw new Error('X and Y values are not distinct');
    return x_values.map(x => y_values.map(y => Fp.inv(Fp.sub(x, y))));
}
exports._poseidonMDS = _poseidonMDS;
const MDS_SMALL = [
    [3, 1, 1],
    [1, -1, 1],
    [1, 1, -2],
].map(i => i.map(BigInt));
function poseidonBasic(opts, mds) {
    (0, modular_1.validateField)(opts.Fp);
    if (
        !Number.isSafeInteger(opts.rate) ||
        !Number.isSafeInteger(opts.capacity)
    )
        throw new Error(`Wrong poseidon opts: ${opts}`);
    const m = opts.rate + opts.capacity;
    const rounds = opts.roundsFull + opts.roundsPartial;
    const roundConstants = [];
    for (let i = 0; i < rounds; i++) {
        const row = [];
        for (let j = 0; j < m; j++)
            row.push(poseidonRoundConstant(opts.Fp, 'Hades', m * i + j));
        roundConstants.push(row);
    }
    const res = (0, poseidon_1.poseidon)({
        ...opts,
        t: m,
        sboxPower: 3,
        reversePartialPowIdx: true,
        mds,
        roundConstants,
    });
    res.m = m;
    res.rate = opts.rate;
    res.capacity = opts.capacity;
    return res;
}
exports.poseidonBasic = poseidonBasic;
function poseidonCreate(opts, mdsAttempt = 0) {
    const m = opts.rate + opts.capacity;
    if (!Number.isSafeInteger(mdsAttempt))
        throw new Error(`Wrong mdsAttempt=${mdsAttempt}`);
    return poseidonBasic(
        opts,
        _poseidonMDS(opts.Fp, 'HadesMDS', m, mdsAttempt),
    );
}
exports.poseidonCreate = poseidonCreate;
exports.poseidonSmall = poseidonBasic(
    {
        Fp: exports.Fp251,
        rate: 2,
        capacity: 1,
        roundsFull: 8,
        roundsPartial: 83,
    },
    MDS_SMALL,
);
function poseidonHash(x, y, fn = exports.poseidonSmall) {
    return fn([x, y, 2n])[0];
}
exports.poseidonHash = poseidonHash;
function poseidonHashFunc(x, y, fn = exports.poseidonSmall) {
    return u.numberToVarBytesBE(
        poseidonHash(u.bytesToNumberBE(x), u.bytesToNumberBE(y), fn),
    );
}
exports.poseidonHashFunc = poseidonHashFunc;
function poseidonHashSingle(x, fn = exports.poseidonSmall) {
    return fn([x, 0n, 1n])[0];
}
exports.poseidonHashSingle = poseidonHashSingle;
function poseidonHashMany(values, fn = exports.poseidonSmall) {
    const { m, rate } = fn;
    if (!Array.isArray(values))
        throw new Error('bigint array expected in values');
    const padded = Array.from(values); // copy
    padded.push(1n);
    while (padded.length % rate !== 0) padded.push(0n);
    let state = new Array(m).fill(0n);
    for (let i = 0; i < padded.length; i += rate) {
        for (let j = 0; j < rate; j++) state[j] += padded[i + j];
        state = fn(state);
    }
    return state[0];
}
exports.poseidonHashMany = poseidonHashMany;
