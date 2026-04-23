
"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/features/auth/context/AuthProvider";

import type {
  EpubDocument,
  EpubIdentifier,
  EpubSpine,
} from "@/types/epub";

import UnauthorizedPage from "@/features/auth/components/UnauthorizedSection";
import { fetchEpubFile } from "@/services/api/epub";
import { loadEpubFromArrayBuffer, parseEpubPackage } from "@/services/epub";


function EpubReader({ identifier }: Readonly<{ identifier: EpubIdentifier }>) {
  const auth = useAuthContext();
  if (!auth) return (<UnauthorizedPage />);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [epubDocument, setEpubDocument] = useState<EpubDocument | null>(null);
  const [epubSpine, setEpubSpine] = useState<EpubSpine | null>(null);

  useEffect(() => {
    if (!auth.user) return;

    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        // 1) Fetch EPUB binary (fallbacks to /public/sample/epub-sample.epub)
        const epubBuffer = await fetchEpubFile(identifier);

        // 2) Unzip EPUB into file map
        const files = await loadEpubFromArrayBuffer(epubBuffer, `${identifier.value}.epub`);

        // 3) Parse OPF/package and extract metadata/spine/navigation
        const document = await parseEpubPackage(files, identifier.value);

        if (isCancelled) return;
        setEpubDocument(document);
        setEpubSpine(document.package.spine);
      } catch (e) {
        if (isCancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load EPUB");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [auth.user, identifier.id, identifier.scheme, identifier.value]);

  if (isLoading) {
    return <div>Loading EPUB data...</div>;
  }

  if (error) {
    return <div>Failed to load EPUB: {error}</div>;
  }

  if (!epubDocument || !epubSpine) {
    return <div>No EPUB data loaded.</div>;
  }

  return (
    <section>
      <h2>{epubDocument.package.metadata.title}</h2>
      <p>Spine items: {epubSpine.items.length}</p>

      <ul>
        {epubSpine.items.map((item, idx) => (
          <li key={`${item.idref}-${idx}`}>
            {idx + 1}. {item.idref}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default EpubReader;
