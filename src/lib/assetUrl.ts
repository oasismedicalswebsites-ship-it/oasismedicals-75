const publishedAssetOrigin = "https://oasismedicals.lovable.app";

export const resolveAssetUrl = (url: string) => {
  if (import.meta.env.DEV && url.startsWith("/__l5e/assets-v1/")) {
    return `${publishedAssetOrigin}${url}`;
  }

  return url;
};