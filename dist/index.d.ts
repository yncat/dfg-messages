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
export declare const RoomState: {
    readonly WAITING: 0;
    readonly PLAYING: 1;
};
export declare type RoomState = typeof RoomState[keyof typeof RoomState];
export declare const RoomStateDecoder: Decoder<0 | 1>;
export interface GameRoomMetadata {
    owner: string;
    roomState: RoomState;
}
export declare const GameRoomMetadataDecoder: Decoder<GameRoomMetadata>;
export declare function encodeGameRoomMetadata(owner: string, roomState: RoomState): GameRoomMetadata;
export declare class PayloadDecodeError extends Error {
}
export declare function decodePayload<T>(encoded: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
decoder: Decoder<T>): T | PayloadDecodeError;
