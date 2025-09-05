interface StorageKey {
  posterSetting?: {
    purpose: string;
    facilityType: string;
    prompt: string;
    mainColor: string;
    mood: string;
    size: string;
    startDate: string; // ex) "2025-09-05-13:00"
    endDate: string; // ex) "2025-09-06-09:00"
    base64: string;
    mimeType: string;
    storeInfo: {
      phone: string;
      address: string;
      name: string;
    };
  };
}

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = String(key);
  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);
    return JSON.parse(value as string);
  };
  const set = (value?: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }
    storage.setItem(storageKey, JSON.stringify(value));
  };
  return { get, set };
};

export const posterSetting = initStorage("posterSetting", localStorage);
