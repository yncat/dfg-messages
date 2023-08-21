import {
  array,
  boolean,
  constant,
  Decoder,
  number,
  object,
  oneOf,
  string,
} from "@mojotech/json-type-validation";

/*
dfg enum definitions 
*/

/*
カードのマーク(スーと)
*/
export const CardMark = {
  CLUBS: 0,
  DIAMONDS: 1,
  HEARTS: 2,
  SPADES: 3,
  JOKER: 4,
  WILD: 5,
} as const;
export type CardMark = typeof CardMark[keyof typeof CardMark];
export const CardMarkDecoder = oneOf(
  constant(CardMark.CLUBS),
  constant(CardMark.DIAMONDS),
  constant(CardMark.HEARTS),
  constant(CardMark.SPADES),
  constant(CardMark.JOKER),
  constant(CardMark.WILD)
);

/*
プレイヤーのランク
*/

export const RankType = {
  UNDETERMINED: 0,
  DAIHINMIN: 1,
  HINMIN: 2,
  HEIMIN: 3,
  FUGO: 4,
  DAIFUGO: 5,
} as const;
export type RankType = typeof RankType[keyof typeof RankType];
export const RankTypeDecoder = oneOf(
  constant(RankType.UNDETERMINED),
  constant(RankType.DAIHINMIN),
  constant(RankType.HINMIN),
  constant(RankType.HEIMIN),
  constant(RankType.FUGO),
  constant(RankType.DAIFUGO)
);

/* スキップ方法 */
export const SkipConfig = {
  OFF: 0, // 飛ばさない
  SINGLE: 1, // 次のプレイヤーを飛ばす
  MULTI: 2, // 出したカードの分だけ飛ばす
} as const;
export type SkipConfig = typeof SkipConfig[keyof typeof SkipConfig];

export const SkipConfigDecoder = oneOf(
  constant(SkipConfig.OFF),
  constant(SkipConfig.SINGLE),
  constant(SkipConfig.MULTI)
);

/*
ルール設定情報
(parameter) yagiri: 8切りが有効かどうか
(parameter) jBack: 11バックが有効かどうか
(parameter) kakumei: 革命/革命返しが有効かどうか
(parameter) reverse: 9リバースが有効かどうか
(parameter) skip: 5スキップの取り扱いをどうするか
(parameter) transfer: 7渡しが有効かどうか
(parameter) exile: 10捨てが有効かどうか
*/
export type RuleConfig = {
  yagiri: boolean;
  jBack: boolean;
  kakumei: boolean;
  reverse: boolean;
  skip: SkipConfig;
  transfer: boolean;
  exile: boolean;
};

export const RuleConfigDecoder: Decoder<RuleConfig> = object({
  yagiri: boolean(),
  jBack: boolean(),
  kakumei: boolean(),
  reverse: boolean(),
  skip: SkipConfigDecoder,
  transfer: boolean(),
  exile: boolean(),
});

export function isValidRuleConfig(obj: unknown): obj is RuleConfig {
  if (typeof obj !== "object") {
    return false;
  }
  const castedObj = obj as RuleConfig;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.yagiri !== "boolean") {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.jBack !== "boolean") {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.kakumei !== "boolean") {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.reverse !== "boolean") {
    return false;
  }
  if (
    ![SkipConfig.OFF, SkipConfig.SINGLE, SkipConfig.MULTI].includes(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      castedObj.skip
    )
  ) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.transfer !== "boolean") {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof castedObj.exile !== "boolean") {
    return false;
  }
  return true;
}

export type GameRoomCreationOptions = {
  ruleConfig: RuleConfig;
};

export function isValidGameRoomCreationOptions(
  obj: unknown
): obj is GameRoomCreationOptions {
  if (typeof obj !== "object") {
    return false;
  }
  const castedObj = obj as GameRoomCreationOptions;
  return isValidRuleConfig(castedObj.ruleConfig);
}

export type GameRoomParticipationOptions = {
  playerName: string;
};

export function isValidGameRoomParticipationOptions(
  obj: unknown
): obj is GameRoomParticipationOptions {
  if (typeof obj !== "object") {
    return false;
  }
  const castedObj = obj as GameRoomParticipationOptions;
  return typeof castedObj.playerName === "string";
}

/*
dfg request / message definitions

# Naming conventions
**Request は、クライアントからサーバーに送信するもの。
**Message は、サーバーからクライアントに送信するもの。
Request がサーバーからクライアントに送られたり、 Message がクライアントからサーバーに送られることはない。

** Metadata は、 room.setMetadata でセットしているメタデータに型を付けたもの。

# non-parameter messages
以下のメッセージは、パラメータを持たないので、コードとしては定義していない。
- RoomOwnerMessage: ルームオーナーの権限をクライアントに与えるとき、そのクライアントに対して送信する。クライアントは、このメッセージを受信したら、ゲーム開始ボタンを表示する。
- GameStartRequest: ルームオーナーのクライアントが、ゲーム開始を要求するときに送信する。
- PassRequest: パスをするときにクライアントから送信するリクエスト。
- NagareMessage: 場のカードが流れたときにイベントログに積まれる。
- YagiriMessage: 8切りが発生したときにイベントログに積まれる。
- JBackMessage: 11バックが発生したときにイベントログに積まれる。強さの変化は、別のメッセージで通知される。
- ReverseMessage: 9リバースが発生したときにイベントログに積まれる。
- KakumeiMessage: 革命が発生したときにイベントログに積まれる。強さの変化は、別のメッセージで通知される。
- GameEndMessage: ゲームが終了したときにイベントログに積まれる。順位は、別のメッセージで通知される。
- RoomCreatedRequest: ルームを作成したクライアントが、ロビーに対して送信する。これを受け取ったら、サーバーは、ロビーの全員に RoomCreatedMessage を返すので、ルームができたことをクライアント全員が把握できるという仕組みになっている。ルームを作成したプレイヤー名は、 session id から引っ張ってくるので、明示的に渡す必要はない。
/*

/*
ChatRequest: チャット送信要求
クライアントからサーバーへチャットを送る。サーバーは、全員に ChatMessage で返す。
(parameter) message: 送信するメッセージ
*/
export interface ChatRequest {
  message: string;
}

export const ChatRequestDecoder: Decoder<ChatRequest> = object({
  message: string(),
});

export function encodeChatRequest(message: string): ChatRequest {
  return {
    message,
  };
}

/*
ChatMessage: チャット通知
サーバーからのチャット通知。
(parameter) playerName: チャットを送信したプレイヤーの名前
(parameter) message: チャットメッセージ
*/
export interface ChatMessage {
  playerName: string;
  message: string;
}

export const ChatMessageDecoder: Decoder<ChatMessage> = object({
  playerName: string(),
  message: string(),
});

export function encodeChatMessage(
  playerName: string,
  message: string
): ChatMessage {
  return {
    playerName,
    message,
  };
}

/*
PlayerJoinedMessage: プレイヤー入室通知
プレイヤーがルームに入室したときにサーバーから送られてくるメッセージ。すでにゲーム中のルームに誰かが入ってきた場合も送られてくる。
(parameter) playerName: 入室したプレイヤーの名前。
*/
export interface PlayerJoinedMessage {
  playerName: string;
}

export const PlayerJoinedMessageDecoder: Decoder<PlayerJoinedMessage> = object({
  playerName: string(),
});

export function encodePlayerJoinedMessage(
  playerName: string
): PlayerJoinedMessage {
  return {
    playerName,
  };
}

/*
PlayerLeftMessage: プレイヤー退室通知
プレイヤーがルームから退室したときにサーバーから送られてくるメッセージ。すでにゲーム中のルームから誰かが退室したときも送られてくる。
(parameter) playerName: 退室したプレイヤーの名前。
*/
export interface PlayerLeftMessage {
  playerName: string;
}

export const PlayerLeftMessageDecoder: Decoder<PlayerLeftMessage> = object({
  playerName: string(),
});

export function encodePlayerLeftMessage(playerName: string): PlayerLeftMessage {
  return {
    playerName,
  };
}

/*
SelectableCardMessage: カード情報+カード選択情報
カードのスーとと番号 + 選択状態、選択可否の情報。出すカードを選ぶチェックボックスを描画するときに使う。メッセージ1つでカード1枚を表す。
(parameter) ID: カードの内部識別子
(parameter) mark: カードのマークを表す定数
(parameter) cardNumber: カードの番号
(parameter) isChecked: 選択状態かどうか
(parameter) isCheckable:チェックボックスを操作可能にするべきかどうか
*/
export interface SelectableCardMessage {
  ID: string;
  mark: CardMark;
  cardNumber: number;
  isChecked: boolean;
  isCheckable: boolean;
}

export const SelectableCardMessageDecoder: Decoder<SelectableCardMessage> =
  object({
    ID: string(),
    mark: CardMarkDecoder,
    cardNumber: number(),
    isChecked: boolean(),
    isCheckable: boolean(),
  });

export function encodeSelectableCardMessage(
  ID: string,
  mark: CardMark,
  cardNumber: number,
  isChecked: boolean,
  isCheckable: boolean
): SelectableCardMessage {
  return {
    ID,
    mark,
    cardNumber,
    isChecked,
    isCheckable,
  };
}

/*
CardListMessage: カードリストのアップデート通知
カードを選ぶチェックボックスのリストの最新状態を表す。
(parameter) cardList: カードリスト。 SelectableCardMessage の配列。
*/
export interface CardListMessage {
  cardList: SelectableCardMessage[];
}

export const CardListMessageDecoder: Decoder<CardListMessage> = object({
  cardList: array(SelectableCardMessageDecoder),
});

export function encodeCardListMessage(
  cardList: SelectableCardMessage[]
): CardListMessage {
  return {
    cardList,
  };
}

/*
TurnMessage: ターン開始通知
ターンの始まりを表す。
(parameter) playerName: 次に行動するプレイヤーの名前
*/
export interface TurnMessage {
  playerName: string;
}

export const TurnMessageDecoder: Decoder<TurnMessage> = object({
  playerName: string(),
});

export function encodeTurnMessage(playerName: string): TurnMessage {
  return {
    playerName,
  };
}

/*
自分のターンのコンテキスト
*/
export const YourTurnContext = {
  INACTIVE: 0, // 自分のターンではなくなった
  ACTIVE: 1, // 自分の通常のターンになった
  TRANSFER: 2, // 7渡しのカード選択になった
  EXILE: 3, // 10捨てのカード選択になった
} as const;
export type YourTurnContext = typeof YourTurnContext[keyof typeof YourTurnContext];
export const YourTurnContextDecoder = oneOf(
  constant(YourTurnContext.INACTIVE),
  constant(YourTurnContext.ACTIVE),
  constant(YourTurnContext.TRANSFER),
  constant(YourTurnContext.EXILE)
);

/*
YourTurnMessage: 「自分のターン」状態変更通知
(parameter) context: ターンコンテキスト情報
(parameter) passable: このターン中パスを可能にするか(自分のターンでないときは false )
*/
export interface YourTurnMessage {
  context: YourTurnContext;
  passable: boolean;
}

export const YourTurnMessageDecoder: Decoder<YourTurnMessage> = object({
  context: YourTurnContextDecoder,
  passable: boolean(),
});

export function encodeYourTurnMessage(context: YourTurnContext, passable: boolean): YourTurnMessage {
  return {
    context,
    passable,
  };
}

/*
CardSelectRequest: カード選択リクエスト
アクティブプレイヤーが特定のカードをカードリストから選択/選択解除するときに、クライアントが送信するリクエスト。
(parameter) index: 選択/選択解除するカードの 0-start インデックス番号
*/
export interface CardSelectRequest {
  index: number;
}

export const CardSelectRequestDecoder: Decoder<CardSelectRequest> = object({
  index: number(),
});

export function encodeCardSelectRequest(index: number): CardSelectRequest {
  return {
    index,
  };
}

/*
DiscardRequest: カードプレイリクエスト
アクティブプレイヤーがカードをプレイするリクエスト。
(parameter) index: 選択するプレイ可能なペアの 0-start インデックス番号。DiscardPairListMessageで通知された最新の情報に基づく。
*/
export interface DiscardRequest {
  index: number;
}

export const DiscardRequestDecoder: Decoder<DiscardRequest> = object({
  index: number(),
});

export function encodeDiscardRequest(index: number): DiscardRequest {
  return {
    index,
  };
}

/*
CardMessage: 選択に関する情報がない単純なカードメッセージ
スーとと数字の情報のみ。出すカードのペアを列挙するときに利用する。
(parameter) mark: カードのスーとを表す定数
(parameter) cardNumber: カード番号
*/
export interface CardMessage {
  mark: CardMark;
  cardNumber: number;
}

export const CardMessageDecoder: Decoder<CardMessage> = object({
  mark: CardMarkDecoder,
  cardNumber: number(),
});

export function encodeCardMessage(
  mark: CardMark,
  cardNumber: number
): CardMessage {
  return {
    mark,
    cardNumber,
  };
}

/*
DiscardPairMessage: 出すカードのペア
1セットの有効なプレイカードのペアを表す。
(parameter) cardList: ペアとなるカード。 CardMessage の配列。
*/
export interface DiscardPairMessage {
  cardList: CardMessage[];
}

export const DiscardPairMessageDecoder: Decoder<DiscardPairMessage> = object({
  cardList: array(CardMessageDecoder),
});

export function encodeDiscardPairMessage(
  cardList: CardMessage[]
): DiscardPairMessage {
  return {
    cardList,
  };
}

/*
DiscardPairListMessage: プレイ可能なペア一覧メッセージ
プレイ可能なカードのペアを列挙した結果を表す。クライアントは、このメッセージを受け取ったら、それぞれをボタンとして描画して、それらがプレイできるようにインターフェイスを提供する。
(parameter) DiscardPairList: 有効なペアの一覧。 DiscardPairMessage の配列。
*/
export interface DiscardPairListMessage {
  discardPairList: DiscardPairMessage[];
}

export const DiscardPairListMessageDecoder: Decoder<DiscardPairListMessage> =
  object({
    discardPairList: array(DiscardPairMessageDecoder),
  });

export function encodeDiscardPairListMessage(
  discardPairList: DiscardPairMessage[]
): DiscardPairListMessage {
  return {
    discardPairList,
  };
}

/*
AgariMessage: あがりメッセージ
プレイヤーが上がったときのメッセージ。順位の情報は、別のメッセージで送られてくる。
(parameter) playerName: あがったプレイヤーの名前。
*/
export interface AgariMessage {
  playerName: string;
}

export const AgariMessageDecoder: Decoder<AgariMessage> = object({
  playerName: string(),
});

export function encodeAgariMessage(playerName: string): AgariMessage {
  return {
    playerName,
  };
}

/*
ForbiddenAgariMessage: 禁止あがりメッセージ
プレイヤーが禁じ手で上がったときのメッセージ。順位の情報は、別のメッセージで送られてくる。
(parameter) playerName: 禁じ手であがったプレイヤーの名前。
*/
export interface ForbiddenAgariMessage {
  playerName: string;
}

export const ForbiddenAgariMessageDecoder: Decoder<ForbiddenAgariMessage> =
  object({
    playerName: string(),
  });

export function encodeForbiddenAgariMessage(
  playerName: string
): ForbiddenAgariMessage {
  return {
    playerName,
  };
}

/*
StrengthInversionMessage: 強さ変化メッセージ
カードの強さが変化したときのメッセージ。
(parameter) isStrengthInverted: true のとき、3が一番強い。 false のとき、2が一番強い。
*/
export interface StrengthInversionMessage {
  isStrengthInverted: boolean;
}

export const StrengthInversionMessageDecoder: Decoder<StrengthInversionMessage> =
  object({
    isStrengthInverted: boolean(),
  });

export function encodeStrengthInversionMessage(
  isStrengthInverted: boolean
): StrengthInversionMessage {
  return {
    isStrengthInverted,
  };
}

/*
TurnSkippedMessage: ターンスキップメッセージ
ターンがスキップされたときのメッセージ。
(parameter) playerName: ターンをスキップされたプレイヤーの名前
*/
export interface TurnSkippedMessage {
  playerName: string;
}

export const TurnSkippedMessageDecoder: Decoder<TurnSkippedMessage> = object({
  playerName: string(),
});

export function encodeTurnSkippedMessage(
  playerName: string
): TurnSkippedMessage {
  return {
    playerName,
  };
}

/*
TransferMessage: カード移動メッセージ
7渡しでカードが移動したときのメッセージ。
(parameter) fromPlayerName: カードを渡したプレイヤーの名前
(parameter) toPlayerName: カードを受け取ったプレイヤーの名前
(parameter) cardList: 渡されたカード。 CardMessage の配列。
*/
export interface TransferMessage {
  fromPlayerName: string;
  toPlayerName: string;
  cardList: CardMessage[];
}

export const TransferMessageDecoder: Decoder<TransferMessage> = object({
  fromPlayerName: string(),
  toPlayerName: string(),
  cardList: array(CardMessageDecoder),
});

export function encodeTransferMessage(
  fromPlayerName: string,
  toPlayerName: string,
  cardList: CardMessage[]
): TransferMessage {
  return {
    fromPlayerName,
    toPlayerName,
    cardList,
  };
}

/*
ExileMessage: 10捨てでカードが捨てられたときのメッセージ
(parameter) playerName: カードを捨てたプレイヤーの名前
(parameter) cardList: 捨てられたカード。 CardMessage の配列。
*/
export interface ExileMessage {
  playerName: string;
  cardList: CardMessage[];
}

export const ExileMessageDecoder: Decoder<ExileMessage> = object({
  playerName: string(),
  cardList: array(CardMessageDecoder),
});

export function encodeExileMessage(
  playerName: string,
  cardList: CardMessage[]
): ExileMessage {
  return {
    playerName,
    cardList,
  };
}

/*
DiscardMessage: カードプレイメッセージ。
カードをプレイして場に出したときのメッセージ。
(parameter) playerName: カードをプレイしたプレイヤーの名前。
(parameter) discardPair: プレイしたカード。 DiscardPairMessage を参照。
(parameter) remainingHandCount: 出した後、手札に残るカードの枚数。
*/
export interface DiscardMessage {
  playerName: string;
  discardPair: DiscardPairMessage;
  remainingHandCount: number;
}

export const DiscardMessageDecoder: Decoder<DiscardMessage> = object({
  playerName: string(),
  discardPair: DiscardPairMessageDecoder,
  remainingHandCount: number(),
});

export function encodeDiscardMessage(
  playerName: string,
  discardPair: DiscardPairMessage,
  remainingHandCount: number
): DiscardMessage {
  return {
    playerName,
    discardPair,
    remainingHandCount,
  };
}

/*
PassMessage: パスメッセージ
プレイヤーがパスしたときのメッセージ。
(parameter) playerName: パスしたプレイヤーの名前。
(parameter) remainingHandCount: 残りの手札枚数。
*/
export interface PassMessage {
  playerName: string;
  remainingHandCount: number;
}

export const PassMessageDecoder: Decoder<PassMessage> = object({
  playerName: string(),
  remainingHandCount: number(),
});

export function encodePassMessage(
  playerName: string,
  remainingHandCount: number
): PassMessage {
  return {
    playerName,
    remainingHandCount,
  };
}

/*
PlayerKickedMessage: プレイヤーキックメッセージ
プレイヤーが接続落ちなどでキックされた時のメッセージ。
(parameter) playerName: キックされたプレイヤーの名前。
*/
export interface PlayerKickedMessage {
  playerName: string;
}

export const PlayerKickedMessageDecoder: Decoder<PlayerKickedMessage> = object({
  playerName: string(),
});

export function encodePlayerKickedMessage(
  playerName: string
): PlayerKickedMessage {
  return {
    playerName,
  };
}

/*
PlayerRankChangedMessage: ランク変更メッセージ
プレイヤーのランクが変化したとき(上がってランクが付いたときも含む)送信されるメッセージ。
(parameter) playerName: ランクが変化したプレイヤーの名前。
(parameter) before: 変更前のランク。変更前にランクが付いていなかったときは RankType.UNDETERMINED という値 (実際には 0) が入る。
(parameter) after: 変更後のランク。 RankType.xx の値。
*/
export interface PlayerRankChangedMessage {
  playerName: string;
  before: RankType;
  after: RankType;
}

export const PlayerRankChangedMessageDecoder: Decoder<PlayerRankChangedMessage> =
  object({
    playerName: string(),
    before: RankTypeDecoder,
    after: RankTypeDecoder,
  });

export function encodePlayerRankChangedMessage(
  playerName: string,
  before: RankType,
  after: RankType
): PlayerRankChangedMessage {
  return {
    playerName,
    before,
    after,
  };
}

/*
InitialInfoMessage: ゲーム開始情報メッセージ
ゲーム開始時、初期情報を伝達するメッセージ。
(parameter) playerCount: ゲームに参加するプレイヤーの数。
(parameter) deckCount: 使用するデッキの数。
*/
export interface InitialInfoMessage {
  playerCount: number;
  deckCount: number;
}

export const InitialInfoMessageDecoder: Decoder<InitialInfoMessage> = object({
  playerCount: number(),
  deckCount: number(),
});

export function encodeInitialInfoMessage(
  playerCount: number,
  deckCount: number
): InitialInfoMessage {
  return {
    playerCount,
    deckCount,
  };
}

/*
CardsProvidedMessage: カード配布メッセージ
特定のプレイヤーにカードが配られたときの通知メッセージ。
(parameter) playerName: カードが配られたプレイヤーの名前。
(parameter) cardCount: 配られたカードの枚数。
*/
export interface CardsProvidedMessage {
  playerName: string;
  cardCount: number;
}

export const CardsProvidedMessageDecoder: Decoder<CardsProvidedMessage> =
  object({
    playerName: string(),
    cardCount: number(),
  });

export function encodeCardsProvidedMessage(
  playerName: string,
  cardCount: number
): CardsProvidedMessage {
  return {
    playerName,
    cardCount,
  };
}

/*
GameEndMessage: ゲーム終了メッセージ
ゲーム終了&結果通知メッセージ
(parameter) daifugoNameList: 大富豪となったプレイヤー名のリスト。リストではあるが、今のところ一人だけ。
(parameter) fugoNameList: 富豪となったプレイヤー名のリスト。
(parameter) heiminNameList: 平民となったプレイヤー名のリスト。
(parameter) hinminNameList: 貧民となったプレイヤー名のリスト。
(parameter) daihinminNameList: 大貧民となったプレイヤー名のリスト。リストではあるが、今のところ一人。
*/
export interface GameEndMessage {
  daifugoNameList: string[];
  fugoNameList: string[];
  heiminNameList: string[];
  hinminNameList: string[];
  daihinminNameList: string[];
}

export const GameEndMessageDecoder: Decoder<GameEndMessage> = object({
  daifugoNameList: array(string()),
  fugoNameList: array(string()),
  heiminNameList: array(string()),
  hinminNameList: array(string()),
  daihinminNameList: array(string()),
});

export function encodeGameEndMessage(
  daifugoNameList: string[],
  fugoNameList: string[],
  heiminNameList: string[],
  hinminNameList: string[],
  daihinminNameList: string[]
): GameEndMessage {
  return {
    daifugoNameList,
    fugoNameList,
    heiminNameList,
    hinminNameList,
    daihinminNameList,
  };
}

/*
RoomCreatedMessage: 新しいルーム作成メッセージ
新しいルームができたことをサーバーから通知してくれる便利メッセージ。ただ、サーバー側がルームを監視しているわけではなく、クライアントから RoomCreatedRequest が来たら、返しで送信しているだけである。
(parameter) playerName: ルームを作成したプレイヤーの名前
*/
export interface RoomCreatedMessage {
  playerName: string;
}

export const RoomCreatedMessageDecoder: Decoder<RoomCreatedMessage> = object({
  playerName: string(),
});

export function encodeRoomCreatedMessage(
  playerName: string
): RoomCreatedMessage {
  return {
    playerName,
  };
}

/*
PlayerLostMessage: プレイヤー接続落ちメッセージ
プレイヤーの接続が落ちたことを通知するメッセージ。ゲームに参加中のプレイヤーが接続落ちした場合に送られる。一定時間以内にそのプレイヤーが戻ってくれば、playerReconnectedMessageで通知される。
(parameter) playerName: 接続が落ちたプレイヤーの名前
*/
export interface PlayerLostMessage {
  playerName: string;
}

export const PlayerLostMessageDecoder: Decoder<PlayerLostMessage> = object({
  playerName: string(),
});

export function encodePlayerLostMessage(playerName: string): PlayerLostMessage {
  return {
    playerName,
  };
}

/*
PlayerReconnectedMessage: プレイヤー接続復帰メッセージ
プレイヤーの接続が復帰したことを通知するメッセージ。
(parameter) playerName: 接続が復帰したプレイヤーの名前
*/
export interface PlayerReconnectedMessage {
  playerName: string;
}

export const PlayerReconnectedMessageDecoder: Decoder<PlayerReconnectedMessage> =
  object({
    playerName: string(),
  });

export function encodePlayerReconnectedMessage(
  playerName: string
): PlayerReconnectedMessage {
  return {
    playerName,
  };
}

/*
PreventCloseMessage: 切断時警告の有効/無効メッセージ
ゲーム中に謝ってブラウザを閉じようとしたとき、クライアントサイドで警告を出したりしてもよい。
PreventClose === true が通知されてから、 preventClose === false が通知されてくるまでの間は、終了時に警告を出した方がよいことを意味する。
(parameter) preventClose: 終了操作に対して警告した方がよい状態かどうか
*/
export interface PreventCloseMessage {
  preventClose: boolean;
}

export const PreventCloseMessageDecoder: Decoder<PreventCloseMessage> = object({
  preventClose: boolean(),
});

export function encodePreventCloseMessage(
  preventClose: boolean
): PreventCloseMessage {
  return {
    preventClose,
  };
}

/*
待機する理由
*/
export const WaitReason = {
  RECONNECTION: 0, // 再接続
  TRANSFER: 1, // 7渡し
  EXILE: 2, // 10捨て
} as const;
export type WaitReason = typeof WaitReason[keyof typeof WaitReason];
export const WaitReasonDecoder = oneOf(
  constant(WaitReason.RECONNECTION),
  constant(WaitReason.TRANSFER),
  constant(WaitReason.EXILE)
);

/*
PlayerWaitingMessage: プレイヤー待ちメッセージ
特定のプレイヤーの再接続、または何らかのアクションを待機していることを通知するメッセージ。再接続待ちでも使うつもりなのと、将来入れるかもしれない追加のアクション（7渡しなど）の待機でも使うつもりがある。
(parameter) playerName: 待機するプレイヤーの名前
(parameter) reason: 待機する理由
*/
export interface PlayerWaitMessage {
  playerName: string;
  reason: WaitReason;
}

export const PlayerWaitMessageDecoder: Decoder<PlayerWaitMessage> = object({
  playerName: string(),
  reason: WaitReasonDecoder,
});

export function encodePlayerWaitMessage(
  playerName: string,
  reason: WaitReason
): PlayerWaitMessage {
  return {
    playerName,
    reason,
  };
}

/*
ルームの現在の状態を表す。
*/
export const RoomState = {
  WAITING: 0,
  PLAYING: 1,
} as const;
export type RoomState = typeof RoomState[keyof typeof RoomState];
export const RoomStateDecoder = oneOf(
  constant(RoomState.WAITING),
  constant(RoomState.PLAYING)
);

/*
GameRoomMetadata: ゲームルームの状態を表すメタデータ。
(parameter) owner: ルームオーナー。
(parameter) RoomState: ルームの状態。
(parameter) ruleConfig: ルール設定。
(parameter) playerNameList: ルームに入っているプレイヤー名の一覧。

*/
export interface GameRoomMetadata {
  owner: string;
  roomState: RoomState;
  ruleConfig: RuleConfig;
  playerNameList: string[];
}

export const GameRoomMetadataDecoder: Decoder<GameRoomMetadata> = object({
  owner: string(),
  roomState: RoomStateDecoder,
  ruleConfig: RuleConfigDecoder,
  playerNameList: array(string()),
});

export function encodeGameRoomMetadata(
  owner: string,
  roomState: RoomState,
  ruleConfig: RuleConfig,
  playerNameList: string[]
): GameRoomMetadata {
  return {
    owner,
    roomState,
    ruleConfig,
    playerNameList,
  };
}

export class PayloadDecodeError extends Error { }
export function decodePayload<T>(
  encoded: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  decoder: Decoder<T>
): T | PayloadDecodeError {
  const ret = decoder.run(encoded);
  if (ret.ok === false) {
    const e = ret.error;
    return new PayloadDecodeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Cannot decode Payload. input: ${e.input}\nat: ${e.at}\nmessage: ${e.message}`
    );
  }
  return ret.result;
}

/* WebSocket カスタムエラーコード */
export const WebSocketErrorCode = {
  // クライアント側とサーバー側のプロトコルバージョンが一致しない
  PROTOCOL_VERSION_MISMATCH: 4000,
  // プレイヤー名に使用できない文字が含まれている、または、使用できない名前のパターンに該当する。
  INVALID_PLAYER_NAME: 4001,
  // 想定していないエラー(たぶんバグ)
  UNEXPECTED: 4002,
} as const;
export type WebSocketErrorCode =
  typeof WebSocketErrorCode[keyof typeof WebSocketErrorCode];

/* WebSocketでエラーが発生したときにサーバーから投げる例外 */
export class AuthError extends Error {
  public code: WebSocketErrorCode;
  constructor(message: string, code: WebSocketErrorCode) {
    super(message);
    this.code = code;
  }
}

/* Other constants */

// プレイヤーの再接続を許可する時間(分単位)
export const maxReconnectionMinute = 5;
