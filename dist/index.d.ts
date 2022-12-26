import { Decoder } from "@mojotech/json-type-validation";
export declare const CardMark: {
    readonly CLUBS: 0;
    readonly DIAMONDS: 1;
    readonly HEARTS: 2;
    readonly SPADES: 3;
    readonly JOKER: 4;
    readonly WILD: 5;
};
export declare type CardMark = typeof CardMark[keyof typeof CardMark];
export declare const CardMarkDecoder: Decoder<0 | 1 | 2 | 3 | 4 | 5>;
export declare const RankType: {
    readonly UNDETERMINED: 0;
    readonly DAIHINMIN: 1;
    readonly HINMIN: 2;
    readonly HEIMIN: 3;
    readonly FUGO: 4;
    readonly DAIFUGO: 5;
};
export declare type RankType = typeof RankType[keyof typeof RankType];
export declare const RankTypeDecoder: Decoder<0 | 1 | 2 | 3 | 4 | 5>;
export declare const SkipConfig: {
    readonly OFF: 0;
    readonly SINGLE: 1;
    readonly MULTI: 2;
};
export declare type SkipConfig = typeof SkipConfig[keyof typeof SkipConfig];
export declare const SkipConfigDecoder: Decoder<0 | 1 | 2>;
export declare type RuleConfig = {
    yagiri: boolean;
    jBack: boolean;
    kakumei: boolean;
    reverse: boolean;
    skip: SkipConfig;
};
export declare const RuleConfigDecoder: Decoder<RuleConfig>;
export declare function isValidRuleConfig(obj: unknown): obj is RuleConfig;
export declare type GameRoomCreationOptions = {
    ruleConfig: RuleConfig;
};
export declare function isValidGameRoomCreationOptions(obj: unknown): obj is GameRoomCreationOptions;
export declare type GameRoomParticipationOptions = {
    playerName: string;
};
export declare function isValidGameRoomParticipationOptions(obj: unknown): obj is GameRoomParticipationOptions;
export interface ChatRequest {
    message: string;
}
export declare const ChatRequestDecoder: Decoder<ChatRequest>;
export declare function encodeChatRequest(message: string): ChatRequest;
export interface ChatMessage {
    playerName: string;
    message: string;
}
export declare const ChatMessageDecoder: Decoder<ChatMessage>;
export declare function encodeChatMessage(playerName: string, message: string): ChatMessage;
export interface PlayerJoinedMessage {
    playerName: string;
}
export declare const PlayerJoinedMessageDecoder: Decoder<PlayerJoinedMessage>;
export declare function encodePlayerJoinedMessage(playerName: string): PlayerJoinedMessage;
export interface PlayerLeftMessage {
    playerName: string;
}
export declare const PlayerLeftMessageDecoder: Decoder<PlayerLeftMessage>;
export declare function encodePlayerLeftMessage(playerName: string): PlayerLeftMessage;
export interface SelectableCardMessage {
    ID: string;
    mark: CardMark;
    cardNumber: number;
    isChecked: boolean;
    isCheckable: boolean;
}
export declare const SelectableCardMessageDecoder: Decoder<SelectableCardMessage>;
export declare function encodeSelectableCardMessage(ID: string, mark: CardMark, cardNumber: number, isChecked: boolean, isCheckable: boolean): SelectableCardMessage;
export interface CardListMessage {
    cardList: SelectableCardMessage[];
}
export declare const CardListMessageDecoder: Decoder<CardListMessage>;
export declare function encodeCardListMessage(cardList: SelectableCardMessage[]): CardListMessage;
export interface TurnMessage {
    playerName: string;
}
export declare const TurnMessageDecoder: Decoder<TurnMessage>;
export declare function encodeTurnMessage(playerName: string): TurnMessage;
export interface YourTurnMessage {
    yourTurn: boolean;
}
export declare const YourTurnMessageDecoder: Decoder<YourTurnMessage>;
export declare function encodeYourTurnMessage(yourTurn: boolean): YourTurnMessage;
export interface CardSelectRequest {
    index: number;
}
export declare const CardSelectRequestDecoder: Decoder<CardSelectRequest>;
export declare function encodeCardSelectRequest(index: number): CardSelectRequest;
export interface DiscardRequest {
    index: number;
}
export declare const DiscardRequestDecoder: Decoder<DiscardRequest>;
export declare function encodeDiscardRequest(index: number): DiscardRequest;
export interface CardMessage {
    mark: CardMark;
    cardNumber: number;
}
export declare const CardMessageDecoder: Decoder<CardMessage>;
export declare function encodeCardMessage(mark: CardMark, cardNumber: number): CardMessage;
export interface DiscardPairMessage {
    cardList: CardMessage[];
}
export declare const DiscardPairMessageDecoder: Decoder<DiscardPairMessage>;
export declare function encodeDiscardPairMessage(cardList: CardMessage[]): DiscardPairMessage;
export interface DiscardPairListMessage {
    discardPairList: DiscardPairMessage[];
}
export declare const DiscardPairListMessageDecoder: Decoder<DiscardPairListMessage>;
export declare function encodeDiscardPairListMessage(discardPairList: DiscardPairMessage[]): DiscardPairListMessage;
export interface AgariMessage {
    playerName: string;
}
export declare const AgariMessageDecoder: Decoder<AgariMessage>;
export declare function encodeAgariMessage(playerName: string): AgariMessage;
export interface ForbiddenAgariMessage {
    playerName: string;
}
export declare const ForbiddenAgariMessageDecoder: Decoder<ForbiddenAgariMessage>;
export declare function encodeForbiddenAgariMessage(playerName: string): ForbiddenAgariMessage;
export interface StrengthInversionMessage {
    isStrengthInverted: boolean;
}
export declare const StrengthInversionMessageDecoder: Decoder<StrengthInversionMessage>;
export declare function encodeStrengthInversionMessage(isStrengthInverted: boolean): StrengthInversionMessage;
export interface TurnSkippedMessage {
    playerName: string;
}
export declare const TurnSkippedMessageDecoder: Decoder<TurnSkippedMessage>;
export declare function encodeTurnSkippedMessage(playerName: string): TurnSkippedMessage;
export interface DiscardMessage {
    playerName: string;
    discardPair: DiscardPairMessage;
    remainingHandCount: number;
}
export declare const DiscardMessageDecoder: Decoder<DiscardMessage>;
export declare function encodeDiscardMessage(playerName: string, discardPair: DiscardPairMessage, remainingHandCount: number): DiscardMessage;
export interface PassMessage {
    playerName: string;
    remainingHandCount: number;
}
export declare const PassMessageDecoder: Decoder<PassMessage>;
export declare function encodePassMessage(playerName: string, remainingHandCount: number): PassMessage;
export interface PlayerKickedMessage {
    playerName: string;
}
export declare const PlayerKickedMessageDecoder: Decoder<PlayerKickedMessage>;
export declare function encodePlayerKickedMessage(playerName: string): PlayerKickedMessage;
export interface PlayerRankChangedMessage {
    playerName: string;
    before: RankType;
    after: RankType;
}
export declare const PlayerRankChangedMessageDecoder: Decoder<PlayerRankChangedMessage>;
export declare function encodePlayerRankChangedMessage(playerName: string, before: RankType, after: RankType): PlayerRankChangedMessage;
export interface InitialInfoMessage {
    playerCount: number;
    deckCount: number;
}
export declare const InitialInfoMessageDecoder: Decoder<InitialInfoMessage>;
export declare function encodeInitialInfoMessage(playerCount: number, deckCount: number): InitialInfoMessage;
export interface CardsProvidedMessage {
    playerName: string;
    cardCount: number;
}
export declare const CardsProvidedMessageDecoder: Decoder<CardsProvidedMessage>;
export declare function encodeCardsProvidedMessage(playerName: string, cardCount: number): CardsProvidedMessage;
export interface GameEndMessage {
    daifugoNameList: string[];
    fugoNameList: string[];
    heiminNameList: string[];
    hinminNameList: string[];
    daihinminNameList: string[];
}
export declare const GameEndMessageDecoder: Decoder<GameEndMessage>;
export declare function encodeGameEndMessage(daifugoNameList: string[], fugoNameList: string[], heiminNameList: string[], hinminNameList: string[], daihinminNameList: string[]): GameEndMessage;
export interface RoomCreatedMessage {
    playerName: string;
}
export declare const RoomCreatedMessageDecoder: Decoder<RoomCreatedMessage>;
export declare function encodeRoomCreatedMessage(playerName: string): RoomCreatedMessage;
export interface PlayerLostMessage {
    playerName: string;
}
export declare const PlayerLostMessageDecoder: Decoder<PlayerLostMessage>;
export declare function encodePlayerLostMessage(playerName: string): PlayerLostMessage;
export interface PlayerReconnectedMessage {
    playerName: string;
}
export declare const PlayerReconnectedMessageDecoder: Decoder<PlayerReconnectedMessage>;
export declare function encodePlayerReconnectedMessage(playerName: string): PlayerReconnectedMessage;
export interface PreventCloseMessage {
    preventClose: boolean;
}
export declare const PreventCloseMessageDecoder: Decoder<PreventCloseMessage>;
export declare function encodePreventCloseMessage(preventClose: boolean): PreventCloseMessage;
export declare const WaitReason: {
    readonly RECONNECTION: 0;
    readonly ACTION: 1;
};
export declare type WaitReason = typeof WaitReason[keyof typeof WaitReason];
export declare const WaitReasonDecoder: Decoder<0 | 1>;
export interface PlayerWaitMessage {
    playerName: string;
    reason: WaitReason;
}
export declare const PlayerWaitMessageDecoder: Decoder<PlayerWaitMessage>;
export declare function encodePlayerWaitMessage(playerName: string, reason: WaitReason): PlayerWaitMessage;
export declare const RoomState: {
    readonly WAITING: 0;
    readonly PLAYING: 1;
};
export declare type RoomState = typeof RoomState[keyof typeof RoomState];
export declare const RoomStateDecoder: Decoder<0 | 1>;
export interface GameRoomMetadata {
    owner: string;
    roomState: RoomState;
    ruleConfig: RuleConfig;
    playerNameList: string[];
}
export declare const GameRoomMetadataDecoder: Decoder<GameRoomMetadata>;
export declare function encodeGameRoomMetadata(owner: string, roomState: RoomState, ruleConfig: RuleConfig, playerNameList: string[]): GameRoomMetadata;
export declare class PayloadDecodeError extends Error {
}
export declare function decodePayload<T>(encoded: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
decoder: Decoder<T>): T | PayloadDecodeError;
export declare const WebSocketErrorCode: {
    readonly PROTOCOL_VERSION_MISMATCH: 4000;
    readonly INVALID_PLAYER_NAME: 4001;
    readonly UNEXPECTED: 4002;
};
export declare type WebSocketErrorCode = typeof WebSocketErrorCode[keyof typeof WebSocketErrorCode];
export declare class AuthError extends Error {
    code: WebSocketErrorCode;
    constructor(message: string, code: WebSocketErrorCode);
}
export declare const maxReconnectionMinute = 5;
