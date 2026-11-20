import { useState } from 'react';
import React from 'react';

import type { InstanceKey } from '../lib/src';
import type { Locked } from '../lib/src';
import type { Patch } from '../lib/src';
import { createStore } from '../lib/src';
import { LOCKED } from '../lib/src';
import { OVERRIDE_LOCKED } from '../lib/src';
import { StoreProvider } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { usePropAll } from '../lib/src';
import { usePropSelector } from '../lib/src';
import { usePropSelectorAll } from '../lib/src';
import { useStore } from '../lib/src';

type UserState = {
  userId: Locked<string>;
  userName: string;
};

const initialUserState: UserState = {
  userId: LOCKED(``),
  userName: ``,
};

const userStore = createStore(`user`, initialUserState, {
  $$init: (): Patch<UserState> => {
    return {};
  },
  $$reset: (): Patch<UserState> => {
    return {};
  },
  userIdOverride: (state, payload: UserIdPayload): Patch<UserState> => {
    return {
      userId: OVERRIDE_LOCKED(payload.userId),
    };
  },
  userIdOverrideWithWarn: (state, payload: UserIdPayload): Patch<UserState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { userId: payload.userId };
  },
  userIdLocked: (state, payload: UserIdPayload): Patch<UserState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { userId: LOCKED(payload.userId) };
  },
  userIdSpread: (state): Patch<UserState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { ...state };
  },
  userNameChange: (state, payload: UserNameChangePayload): Patch<UserState> => {
    return {
      userName: payload.userName,
    };
  },
  userNameFromUserId: (state): Patch<UserState> => {
    return {
      userName: `User ${state.userId}`,
    };
  },
  userNameLocked: (state, payload: UserNameChangePayload): Patch<UserState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { userName: LOCKED(payload.userName) };
  },
  userNameOverride: (state, payload: UserNameChangePayload): Patch<UserState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { userName: OVERRIDE_LOCKED(payload.userName) };
  },
});

type UserIdPayload = {
  userId: string;
};

type UserNameChangePayload = {
  userName: string;
};

type DraftState = {
  draftId: Locked<string>;
  note: undefined | string;
};

function createDraftStore() {
  const initialDraftState: DraftState = {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    draftId: OVERRIDE_LOCKED(`draft-1`),
    note: undefined,
  };

  return createStore(
    `draft`,
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    initialDraftState,
    {
      $$init: (): Patch<DraftState> => {
        return {};
      },
      $$reset: (): Patch<DraftState> => {
        return {};
      },
    },
  );
}

type SessionState = {
  sessionId: Locked<string>;
  title: string;
};

const initialSessionState: SessionState = {
  sessionId: LOCKED(``),
  title: ``,
};

const sessionStore = createStore(`session`, initialSessionState, {
  $$init: (state): Patch<SessionState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { sessionId: state.sessionId, title: `Session ${state.sessionId}` };
  },
  $$reset: (state): Patch<SessionState> => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return { ...state };
  },
});

const instanceKeys: InstanceKey[] = [`a`, `b`];

function hasUserId(state: { userId: string }): boolean {
  return state.userId !== ``;
}

export const App = React.memo(function App() {
  console.log(`App render`);

  useStore(userStore, instanceKeys, (init, instanceKey) => {
    return init({
      userId: `user-${String(instanceKey)}`,
      userName: `User ${String(instanceKey)}`,
    });
  });

  return (
    <div>
      {instanceKeys.map((instanceKey) => (
        <User
          key={String(instanceKey)}
          instanceKey={instanceKey}
        />
      ))}
      <Summary />
      <SummaryLogger />
      <IncorrectPrefill />
      <IncorrectDraft />
      <IncorrectSessionToggle />
    </div>
  );
});

type UserProps = {
  instanceKey: InstanceKey;
};

const User = React.memo(function User(props: UserProps) {
  const userId: string = useProp(userStore.userId, props.instanceKey);
  const userName = useProp(userStore.userName, props.instanceKey);
  const dispatchUserIdOverride = useDispatcher(userStore.userIdOverride);
  const dispatchUserIdOverrideWithWarn = useDispatcher(userStore.userIdOverrideWithWarn);
  const dispatchUserNameFromUserId = useDispatcher(userStore.userNameFromUserId);
  const dispatchUserNameChange = useDispatcher(userStore.userNameChange);

  console.log(`User render`, { instanceKey: props.instanceKey, userId, userName });

  return (
    <div>
      <span>{String(props.instanceKey)}: {userId}</span>
      {` `}
      <input
        value={userName}
        onChange={(event) => dispatchUserNameChange(props.instanceKey, { userName: event.target.value })}
      />
      {` `}
      <button
        onClick={() => dispatchUserNameFromUserId(props.instanceKey)}
      >
        Name from userId
      </button>
      {` `}
      <button
        onClick={() => dispatchUserIdOverrideWithWarn(props.instanceKey, { userId: `${userId}!` })}
      >
        Override userId (warns in console)
      </button>
      {` `}
      <button
        onClick={() => dispatchUserIdOverride(props.instanceKey, { userId: `${userId}?` })}
      >
        Override userId (no warning)
      </button>
      <IncorrectButtons instanceKey={props.instanceKey} />
    </div>
  );
});

const IncorrectButtons = React.memo(function IncorrectButtons(props: UserProps) {
  const userId = useProp(userStore.userId, props.instanceKey);
  const userName = useProp(userStore.userName, props.instanceKey);
  const dispatchUserIdLocked = useDispatcher(userStore.userIdLocked);
  const dispatchUserIdSpread = useDispatcher(userStore.userIdSpread);
  const dispatchUserNameLocked = useDispatcher(userStore.userNameLocked);
  const dispatchUserNameOverride = useDispatcher(userStore.userNameOverride);

  return (
    <div>
      Incorrect:
      {` `}
      <button
        onClick={() => dispatchUserIdLocked(props.instanceKey, { userId: `${userId}#` })}
      >
        userId: LOCKED
      </button>
      {` `}
      <button
        onClick={() => dispatchUserIdSpread(props.instanceKey)}
      >
        userId: ...state
      </button>
      {` `}
      <button
        onClick={() => dispatchUserNameLocked(props.instanceKey, { userName: `${userName}!` })}
      >
        userName: LOCKED
      </button>
      {` `}
      <button
        onClick={() => dispatchUserNameOverride(props.instanceKey, { userName: `${userName}?` })}
      >
        userName: OVERRIDE_LOCKED
      </button>
    </div>
  );
});

const IncorrectPrefill = React.memo(function IncorrectPrefill() {
  const userIdC = useProp(userStore.userId, `c`);
  const userIdD = useProp(userStore.userId, `d`);

  useStore(userStore, [`c`], (init) => {
    // Некорректное использование. Так делать не надо.
    // @ts-expect-error
    return init({ userId: LOCKED(`user-c`) });
  });

  return (
    <StoreProvider
      instanceKey={`d`}
      // Некорректное использование. Так делать не надо.
      // @ts-expect-error
      prefill={{ userId: OVERRIDE_LOCKED(`user-d`) }}
      store={userStore}
    >
      <div>IncorrectPrefill c: {userIdC}, d: {userIdD}</div>
    </StoreProvider>
  );
});

const IncorrectDraft = React.memo(function IncorrectDraft() {
  const [draftStore] = useState(createDraftStore);
  const draftId = useProp(draftStore.draftId);
  const note = useProp(draftStore.note);

  useStore(draftStore, (init) => {
    return init();
  });

  return (
    <div>IncorrectDraft draftId: {draftId}, note: {String(note)}</div>
  );
});

const Summary = React.memo(function Summary() {
  const userIdAll: [InstanceKey, string][] = usePropAll(userStore.userId, hasUserId);

  console.log(`Summary render`, { userIdAll });

  return (
    <div>
      Instances with userId: {userIdAll.map(([instanceKey, userId]) => `${String(instanceKey)}=${userId}`).join(`, `)}
    </div>
  );
});

const SummaryLogger = React.memo(function SummaryLogger() {
  const selectUserId: () => string = usePropSelector(userStore.userId, `a`);
  const selectUserIdAll: () => [InstanceKey, string][] = usePropSelectorAll(userStore.userId);

  console.log(`SummaryLogger render`);

  return (
    <div>
      <button
        onClick={() => {
          console.log(`SummaryLogger click`, { userId: selectUserId(), userIdAll: selectUserIdAll() });
        }}
      >
        Log userId
      </button>
    </div>
  );
});

const IncorrectSessionToggle = React.memo(function IncorrectSessionToggle() {
  const [sessionVisible, setSessionVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => setSessionVisible( ! sessionVisible)}
      >
        {sessionVisible ? `Hide incorrect session` : `Show incorrect session`}
      </button>
      {sessionVisible
        ? (
          <IncorrectSession />
        )
        : null}
    </div>
  );
});

const IncorrectSession = React.memo(function IncorrectSession() {
  const title = useProp(sessionStore.title);

  useStore(sessionStore, (init) => {
    return init({ sessionId: `session-1` });
  });

  return (
    <div>IncorrectSession title: {title}</div>
  );
});
