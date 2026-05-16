const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const resolveBackendUrl = () => {
  const configuredUrl = import.meta.env.VITE_BACKEND_URL;

  if (configuredUrl && configuredUrl.trim()) {
    return trimTrailingSlash(configuredUrl.trim());
  }

  return "http://localhost:5000";
};

export const BACKEND_URL = resolveBackendUrl();
