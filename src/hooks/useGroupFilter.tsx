import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

export function useGroupFilter(groups: { slug: string }[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const groupFromUrl = searchParams.get("group");

  // 🧠 valida o group
  const validGroup = useMemo(() => {
    if (!groups.length) {
      return "";
    }

    const exists = groups.some((g) => g.slug === groupFromUrl);

    return exists ? groupFromUrl! : groups[0].slug;
  }, [groups, groupFromUrl]);

  // 🔄 corrige a URL automaticamente
  useEffect(() => {
    if (!groups.length) {
      return;
    }

    if (groupFromUrl !== validGroup) {
      setSearchParams((prev) => {
        prev.set("group", validGroup);
        return prev;
      });
    }
  }, [groupFromUrl, validGroup, groups, setSearchParams]);

  return {
    group: validGroup,
    setGroup: (value: string) => {
      setSearchParams((prev) => {
        prev.set("group", value);
        return prev;
      });
    },
  };
}
