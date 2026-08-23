export function deepCopy<
  TData extends any,
>(data: TData): TData {
  return deepCopyInner(data);
}

function deepCopyInner<
  TData extends any,
>(data: TData, circleHack: any[][] = []): TData {
  const circleHackDataIndex = circleHack.findIndex((circleHackData) => circleHackData[0] === data);
  if (circleHackDataIndex >= 0) {
    return circleHack[circleHackDataIndex][1];
  }
  else if (data == null) {
    return data;
  }
  else if (Array.isArray(data)) {
    const nextData = [] as unknown[];
    const nextCircleHack = [...circleHack, [data, nextData]];

    for (let index = 0; index < data.length; index++) {
      nextData[index] = deepCopyInner(data[index], nextCircleHack);
    }

    return nextData as TData;
  }
  else if (typeof data === `function`) {
    return (() => {}) as TData;
  }
  else if (typeof data === `object`) {
    const nextData = {} as Record<string | symbol, unknown>;
    const nextCircleHack = [...circleHack, [data, nextData]];

    for (const key of [...Object.getOwnPropertyNames(data), ...Object.getOwnPropertySymbols(data)]) {
      nextData[key] = deepCopyInner((data as Record<string | symbol, unknown>)[key], nextCircleHack);
    }

    return nextData as TData;
  }
  else {
    return data;
  }
}
