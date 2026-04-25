import { useRef, useState } from "react";

interface UseGroupScrollProps {
  offset?: number;
}

export function useGroupScroll({ offset = 80 }: UseGroupScrollProps = {}) {
  const [activeGroupId, setActiveGroupId] = useState<string | undefined>("");

  const groupSectionsRef = useRef<Record<string, HTMLDivElement>>({});

  const registerGroupSection =
    (groupId: string) => (el: HTMLDivElement | null) => {
      if (!el) {
        return;
      }
      groupSectionsRef.current[groupId] = el;
    };

  const scrollToGroup = (groupId: string) => {
    const section = groupSectionsRef.current[groupId];
    if (!section) {
      return;
    }

    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const observeSections = () => {
    const sections = Object.values(groupSectionsRef.current);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleId: string | null = null;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleId = entry.target.id;
            break;
          }
        }

        if (visibleId) {
          setActiveGroupId(visibleId);
        }
      },
      {
        rootMargin: "-5% 0px -60% 0px",
        threshold: 0,
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      for (const section of sections) {
        observer.unobserve(section);
      }
      observer.disconnect();
    };
  };

  return {
    activeGroupId,
    setActiveGroupId,
    registerGroupSection,
    scrollToGroup,
    observeSections,
  };
}
