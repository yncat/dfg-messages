"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomCreatedMessageDecoder = exports.encodeGameEndMessage = exports.GameEndMessageDecoder = exports.encodeCardsProvidedMessage = exports.CardsProvidedMessageDecoder = exports.encodeInitialInfoMessage = exports.InitialInfoMessageDecoder = exports.encodePlayerRankChangedMessage = exports.PlayerRankChangedMessageDecoder = exports.encodePlayerKickedMessage = exports.PlayerKickedMessageDecoder = exports.encodePassMessage = exports.PassMessageDecoder = exports.encodeDiscardMessage = exports.DiscardMessageDecoder = exports.encodeStrengthInversionMessage = exports.StrengthInversionMessageDecoder = exports.encodeForbiddenAgariMessage = exports.ForbiddenAgariMessageDecoder = exports.encodeAgariMessage = exports.AgariMessageDecoder = exports.encodeDiscardPairListMessage = exports.DiscardPairListMessageDecoder = exports.encodeDiscardPairMessage = exports.DiscardPairMessageDecoder = exports.encodeCardMessage = exports.CardMessageDecoder = exports.encodeDiscardRequest = exports.DiscardRequestDecoder = exports.encodeCardSelectRequest = exports.CardSelectRequestDecoder = exports.encodeTurnMessage = exports.TurnMessageDecoder = exports.encodeCardListMessage = exports.CardListMessageDecoder = exports.encodeSelectableCardMessage = exports.SelectableCardMessageDecoder = exports.encodePlayerLeftMessage = exports.PlayerLeftMessageDecoder = exports.encodePlayerJoinedMessage = exports.PlayerJoinedMessageDecoder = exports.encodeChatMessage = exports.ChatMessageDecoder = exports.encodeChatRequest = exports.ChatRequestDecoder = exports.SkipConfig = exports.RankTypeDecoder = exports.RankType = exports.CardMarkDecoder = exports.CardMark = void 0;
exports.AuthError = exports.WebSocketErrorCode = exports.decodePayload = exports.PayloadDecodeError = exports.encodeGameRoomMetadata = exports.GameRoomMetadataDecoder = exports.RoomStateDecoder = exports.RoomState = exports.encodeRoomCreatedMessage = void 0;
const json_type_validation_1 = require("@mojotech/json-type-validation");
/*
dfg enum definitions
*/
/*
カードのマーク(スーと)
*/
exports.CardMark = {
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3,
    JOKER: 4,
    WILD: 5,
};
exports.CardMarkDecoder = json_type_validation_1.oneOf(json_type_validation_1.constant(exports.CardMark.CLUBS), json_type_validation_1.constant(exports.CardMark.DIAMONDS), json_type_validation_1.constant(exports.CardMark.HEARTS), json_type_validation_1.constant(exports.CardMark.SPADES), json_type_validation_1.constant(exports.CardMark.JOKER), json_type_validation_1.constant(exports.CardMark.WILD));
/*
プレイヤーのランク
*/
exports.RankType = {
    UNDETERMINED: 0,
    DAIHINMIN: 1,
    HINMIN: 2,
    HEIMIN: 3,
    FUGO: 4,
    DAIFUGO: 5,
};
exports.RankTypeDecoder = json_type_validation_1.oneOf(json_type_validation_1.constant(exports.RankType.UNDETERMINED), json_type_validation_1.constant(exports.RankType.DAIHINMIN), json_type_validation_1.constant(exports.RankType.HINMIN), json_type_validation_1.constant(exports.RankType.HEIMIN), json_type_validation_1.constant(exports.RankType.FUGO), json_type_validation_1.constant(exports.RankType.DAIFUGO));
/* スキップ方法 */
exports.SkipConfig = {
    OFF: 0,
    SINGLE: 1,
    MULTI: 2, // 出したカードの分だけ飛ばす
};
exports.ChatRequestDecoder = json_type_validation_1.object({
    message: json_type_validation_1.string(),
});
function encodeChatRequest(message) {
    return {
        message,
    };
}
exports.encodeChatRequest = encodeChatRequest;
exports.ChatMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
    message: json_type_validation_1.string(),
});
function encodeChatMessage(playerName, message) {
    return {
        playerName,
        message,
    };
}
exports.encodeChatMessage = encodeChatMessage;
exports.PlayerJoinedMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodePlayerJoinedMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodePlayerJoinedMessage = encodePlayerJoinedMessage;
exports.PlayerLeftMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodePlayerLeftMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodePlayerLeftMessage = encodePlayerLeftMessage;
exports.SelectableCardMessageDecoder = json_type_validation_1.object({
    ID: json_type_validation_1.string(),
    mark: exports.CardMarkDecoder,
    cardNumber: json_type_validation_1.number(),
    isChecked: json_type_validation_1.boolean(),
    isCheckable: json_type_validation_1.boolean(),
});
function encodeSelectableCardMessage(ID, mark, cardNumber, isChecked, isCheckable) {
    return {
        ID,
        mark,
        cardNumber,
        isChecked,
        isCheckable,
    };
}
exports.encodeSelectableCardMessage = encodeSelectableCardMessage;
exports.CardListMessageDecoder = json_type_validation_1.object({
    cardList: json_type_validation_1.array(exports.SelectableCardMessageDecoder),
});
function encodeCardListMessage(cardList) {
    return {
        cardList,
    };
}
exports.encodeCardListMessage = encodeCardListMessage;
exports.TurnMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodeTurnMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodeTurnMessage = encodeTurnMessage;
exports.CardSelectRequestDecoder = json_type_validation_1.object({
    index: json_type_validation_1.number(),
});
function encodeCardSelectRequest(index) {
    return {
        index,
    };
}
exports.encodeCardSelectRequest = encodeCardSelectRequest;
exports.DiscardRequestDecoder = json_type_validation_1.object({
    index: json_type_validation_1.number(),
});
function encodeDiscardRequest(index) {
    return {
        index,
    };
}
exports.encodeDiscardRequest = encodeDiscardRequest;
exports.CardMessageDecoder = json_type_validation_1.object({
    mark: exports.CardMarkDecoder,
    cardNumber: json_type_validation_1.number(),
});
function encodeCardMessage(mark, cardNumber) {
    return {
        mark,
        cardNumber,
    };
}
exports.encodeCardMessage = encodeCardMessage;
exports.DiscardPairMessageDecoder = json_type_validation_1.object({
    cardList: json_type_validation_1.array(exports.CardMessageDecoder),
});
function encodeDiscardPairMessage(cardList) {
    return {
        cardList,
    };
}
exports.encodeDiscardPairMessage = encodeDiscardPairMessage;
exports.DiscardPairListMessageDecoder = json_type_validation_1.object({
    discardPairList: json_type_validation_1.array(exports.DiscardPairMessageDecoder),
});
function encodeDiscardPairListMessage(discardPairList) {
    return {
        discardPairList,
    };
}
exports.encodeDiscardPairListMessage = encodeDiscardPairListMessage;
exports.AgariMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodeAgariMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodeAgariMessage = encodeAgariMessage;
exports.ForbiddenAgariMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodeForbiddenAgariMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodeForbiddenAgariMessage = encodeForbiddenAgariMessage;
exports.StrengthInversionMessageDecoder = json_type_validation_1.object({
    isStrengthInverted: json_type_validation_1.boolean(),
});
function encodeStrengthInversionMessage(isStrengthInverted) {
    return {
        isStrengthInverted,
    };
}
exports.encodeStrengthInversionMessage = encodeStrengthInversionMessage;
exports.DiscardMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
    discardPair: exports.DiscardPairMessageDecoder,
    remainingHandCount: json_type_validation_1.number(),
});
function encodeDiscardMessage(playerName, discardPair, remainingHandCount) {
    return {
        playerName,
        discardPair,
        remainingHandCount,
    };
}
exports.encodeDiscardMessage = encodeDiscardMessage;
exports.PassMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
    remainingHandCount: json_type_validation_1.number(),
});
function encodePassMessage(playerName, remainingHandCount) {
    return {
        playerName,
        remainingHandCount,
    };
}
exports.encodePassMessage = encodePassMessage;
exports.PlayerKickedMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodePlayerKickedMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodePlayerKickedMessage = encodePlayerKickedMessage;
exports.PlayerRankChangedMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
    before: exports.RankTypeDecoder,
    after: exports.RankTypeDecoder,
});
function encodePlayerRankChangedMessage(playerName, before, after) {
    return {
        playerName,
        before,
        after,
    };
}
exports.encodePlayerRankChangedMessage = encodePlayerRankChangedMessage;
exports.InitialInfoMessageDecoder = json_type_validation_1.object({
    playerCount: json_type_validation_1.number(),
    deckCount: json_type_validation_1.number(),
});
function encodeInitialInfoMessage(playerCount, deckCount) {
    return {
        playerCount,
        deckCount,
    };
}
exports.encodeInitialInfoMessage = encodeInitialInfoMessage;
exports.CardsProvidedMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
    cardCount: json_type_validation_1.number(),
});
function encodeCardsProvidedMessage(playerName, cardCount) {
    return {
        playerName,
        cardCount,
    };
}
exports.encodeCardsProvidedMessage = encodeCardsProvidedMessage;
exports.GameEndMessageDecoder = json_type_validation_1.object({
    daifugoNameList: json_type_validation_1.array(json_type_validation_1.string()),
    fugoNameList: json_type_validation_1.array(json_type_validation_1.string()),
    heiminNameList: json_type_validation_1.array(json_type_validation_1.string()),
    hinminNameList: json_type_validation_1.array(json_type_validation_1.string()),
    daihinminNameList: json_type_validation_1.array(json_type_validation_1.string()),
});
function encodeGameEndMessage(daifugoNameList, fugoNameList, heiminNameList, hinminNameList, daihinminNameList) {
    return {
        daifugoNameList,
        fugoNameList,
        heiminNameList,
        hinminNameList,
        daihinminNameList,
    };
}
exports.encodeGameEndMessage = encodeGameEndMessage;
exports.RoomCreatedMessageDecoder = json_type_validation_1.object({
    playerName: json_type_validation_1.string(),
});
function encodeRoomCreatedMessage(playerName) {
    return {
        playerName,
    };
}
exports.encodeRoomCreatedMessage = encodeRoomCreatedMessage;
/*
ルームの現在の状態を表す。
*/
exports.RoomState = {
    WAITING: 0,
    PLAYING: 1,
};
exports.RoomStateDecoder = json_type_validation_1.oneOf(json_type_validation_1.constant(exports.RoomState.WAITING), json_type_validation_1.constant(exports.RoomState.PLAYING));
exports.GameRoomMetadataDecoder = json_type_validation_1.object({
    owner: json_type_validation_1.string(),
    roomState: exports.RoomStateDecoder,
});
function encodeGameRoomMetadata(owner, roomState) {
    return {
        owner,
        roomState,
    };
}
exports.encodeGameRoomMetadata = encodeGameRoomMetadata;
class PayloadDecodeError extends Error {
}
exports.PayloadDecodeError = PayloadDecodeError;
function decodePayload(encoded, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
decoder) {
    const ret = decoder.run(encoded);
    if (ret.ok === false) {
        const e = ret.error;
        return new PayloadDecodeError("Cannot decode Payload." +
            "input: " +
            e.input +
            "\n" +
            "at: " +
            e.at +
            "\n" +
            "message: " +
            e.message);
    }
    return ret.result;
}
exports.decodePayload = decodePayload;
/* WebSocket カスタムエラーコード */
exports.WebSocketErrorCode = {
    // クライアント側とサーバー側のプロトコルバージョンが一致しない
    PROTOCOL_VERSION_MISMATCH: 4000,
    // プレイヤー名に使用できない文字が含まれている、または、使用できない名前のパターンに該当する。
    INVALID_PLAYER_NAME: 4001,
};
/* WebSocketでエラーが発生したときにサーバーから投げる例外 */
class AuthError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.AuthError = AuthError;
