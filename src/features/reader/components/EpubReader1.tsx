/* Copyright (c) 2026, Yao Zeran
 *
 * EPUB iframe reader component for displaying and navigating EPUB content
 *   with support for themes, fonts, and reading progress tracking. */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
	EpubDocument,
	EpubLocation,
	EpubViewSettings,
	EpubTheme,
	EpubReadingFlow,
	EpubFontSettings,
} from "@/types/epub";


export interface EpubReaderProps {
	readonly document: EpubDocument;
	readonly onLocationChange?: (location: EpubLocation) => void;
	readonly initialLocation?: EpubLocation;
	readonly viewSettings?: Partial<EpubViewSettings>;
	readonly onError?: (error: Error) => void;
}


export interface EpubReaderHandle {
	nextPage: () => void;
	previousPage: () => void;
	goToLocation: (location: EpubLocation) => void;
	getCurrentLocation: () => EpubLocation | null;
}


const DEFAULT_FONT_SETTINGS: EpubFontSettings = {
	fontFamily: "serif",
	fontSizePercent: 100,
	lineHeight: 1.5,
};


const DEFAULT_VIEW_SETTINGS: EpubViewSettings = {
	theme: "light",
	flow: "paginated",
	layout: "reflowable",
	orientation: "auto",
	spread: "auto",
	font: DEFAULT_FONT_SETTINGS,
	enableHyphenation: true,
	enableSelection: true,
	enableTapToTurn: true,
};


export const EpubReader: React.FC<Readonly<EpubReaderProps>> = ({
	document,
	onLocationChange,
	initialLocation,
	viewSettings: customViewSettings,
	onError,
}) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [currentSpineIndex, setCurrentSpineIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const viewSettings = {
		...DEFAULT_VIEW_SETTINGS,
		...customViewSettings,
	};

	// Initialize spine index from initial location
	useEffect(() => {
		if (initialLocation) {
			setCurrentSpineIndex(initialLocation.spineIndex);
		}
	}, [initialLocation]);

	// Get current spine item
	const currentSpineItem = document.package.spine.items[currentSpineIndex];
	const currentManifestItem = currentSpineItem
		? document.resources.byId[currentSpineItem.idref]
		: null;

	// Generate CSS for theme and font settings
	const generateCss = useCallback((): string => {
		const { theme, font } = viewSettings;

		const themeColors: Record<EpubTheme, { bg: string; text: string }> = {
			light: { bg: "#ffffff", text: "#000000" },
			sepia: { bg: "#f4ecd8", text: "#5c4033" },
			dark: { bg: "#1a1a1a", text: "#e0e0e0" },
			system: { bg: "#ffffff", text: "#000000" }, // Fallback to light
		};

		const colors = themeColors[theme] || themeColors.light;

		return `
			* {
				margin: 0;
				padding: 0;
				border: 0;
			}

			html, body {
				height: 100%;
				margin: 0;
				padding: 1em;
				background-color: ${colors.bg} !important;
				color: ${colors.text} !important;
				font-family: ${font.fontFamily || "serif"};
				font-size: ${font.fontSizePercent}%;
				line-height: ${font.lineHeight};
				${font.letterSpacing ? `letter-spacing: ${font.letterSpacing}px;` : ""}
				${font.wordSpacing ? `word-spacing: ${font.wordSpacing}px;` : ""}
			}

			body {
				width: 100%;
				max-width: 100%;
				overflow: auto;
			}

			/* Typography */
			p, div, span, a, ul, ol, li, h1, h2, h3, h4, h5, h6 {
				color: ${colors.text} !important;
				background-color: transparent !important;
			}

			a {
				text-decoration: underline;
				color: #0066cc;
			}

			img {
				max-width: 100%;
				height: auto;
				margin: 0.5em 0;
			}

			/* Hyphenation */
			${
				viewSettings.enableHyphenation
					? `p { hyphens: auto; word-break: break-word; }`
					: ""
			}

			/* Disable selection if needed */
			${
				!viewSettings.enableSelection
					? "body { user-select: none; -webkit-user-select: none; }"
					: ""
			}
		`;
	}, [viewSettings]);

	// Load and render current spine item
	useEffect(() => {
		if (!iframeRef.current || !currentManifestItem) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const iframe = iframeRef.current;
			const doc = iframe.contentDocument;

			if (!doc) {
				throw new Error("Cannot access iframe document");
			}

			// Clear previous content
			doc.open();
			doc.write(`
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<style>
							${generateCss()}
						</style>
					</head>
					<body></body>
				</html>
			`);
			doc.close();

			// Load the spine item content
			const spine = document.package.spine;
			const manifest = document.resources.byId[currentSpineItem!.idref];

			if (manifest && manifest.mediaType === "application/xhtml+xml") {
				// For XHTML content, we need to fetch and inject it
				// This is simplified - in production you'd handle this differently
				const bodyEl = doc.querySelector("body");
				if (bodyEl) {
					bodyEl.innerHTML = `
						<div class="epub-loading">
							<p>Loading chapter...</p>
						</div>
					`;

					// In a real implementation, you would:
					// 1. Fetch the file from document resources
					// 2. Parse the XHTML
					// 3. Inject it into the iframe with proper handling of relative URLs
					// For now, we show the spine structure
					bodyEl.innerHTML = `
						<div class="epub-chapter">
							<h1>${manifest.id}</h1>
							<p>Chapter content would be loaded here.</p>
							<p><em>Currently showing: ${manifest.href}</em></p>
						</div>
					`;
				}
			}

			setIsLoading(false);

			// Notify location change
			const location: EpubLocation = {
				href: currentManifestItem.href,
				spineIndex: currentSpineIndex,
				progress: currentSpineIndex / Math.max(spine.items.length, 1),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			onLocationChange?.(location);
		} catch (err) {
			const error = err instanceof Error ? err : new Error(String(err));
			setError(error.message);
			onError?.(error);
			setIsLoading(false);
		}
	}, [currentSpineIndex, currentManifestItem, document, generateCss, onLocationChange, onError]);

	// Navigation handlers
	const goToNextPage = useCallback(() => {
		setCurrentSpineIndex((prev) => Math.min(prev + 1, document.package.spine.items.length - 1));
	}, [document.package.spine.items.length]);

	const goToPreviousPage = useCallback(() => {
		setCurrentSpineIndex((prev) => Math.max(prev - 1, 0));
	}, []);

	const goToSpineIndex = useCallback((index: number) => {
		const max = document.package.spine.items.length - 1;
		setCurrentSpineIndex(Math.max(0, Math.min(index, max)));
	}, [document.package.spine.items.length]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!viewSettings.enableTapToTurn) return;

			if (e.key === "ArrowRight" || e.key === " ") {
				goToNextPage();
			} else if (e.key === "ArrowLeft" || e.key === "Backspace") {
				goToPreviousPage();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [goToNextPage, goToPreviousPage, viewSettings.enableTapToTurn]);

	const totalItems = document.package.spine.items.length;
	const progress = ((currentSpineIndex + 1) / totalItems) * 100;

	return (
		<div className="epub-reader">
			{/* Reader Controls */}
			<div className="epub-reader-controls" style={styles.controls}>
				<button
					onClick={goToPreviousPage}
					disabled={currentSpineIndex === 0}
					style={styles.button}
				>
					← Previous
				</button>

				<div style={styles.info}>
					<span>
						Page {currentSpineIndex + 1} of {totalItems}
					</span>
					<div style={styles.progressBar}>
						<div style={{ ...styles.progressFill, width: `${progress}%` }} />
					</div>
				</div>

				<button
					onClick={goToNextPage}
					disabled={currentSpineIndex === totalItems - 1}
					style={styles.button}
				>
					Next →
				</button>
			</div>

			{/* Error Message */}
			{error && (
				<div style={styles.error}>
					<p>Error loading chapter: {error}</p>
				</div>
			)}

			{/* EPUB Content iframe */}
			<iframe
				ref={iframeRef}
				title="EPUB Reader"
				style={styles.iframe}
				frameBorder="0"
				sandbox={undefined}
			/>

			{/* Loading Indicator */}
			{isLoading && (
				<div style={styles.loading}>
					<p>Loading...</p>
				</div>
			)}
		</div>
	);
};


const styles: Record<string, React.CSSProperties> = {
	controls: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "1em",
		padding: "1em",
		borderBottom: "1px solid #ccc",
		backgroundColor: "#f5f5f5",
	},

	button: {
		padding: "0.5em 1em",
		borderRadius: "4px",
		border: "1px solid #999",
		backgroundColor: "#fff",
		cursor: "pointer",
		fontSize: "0.9em",
		transition: "background-color 0.2s",
	},

	info: {
		flex: 1,
		textAlign: "center",
		fontSize: "0.9em",
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
	},

	progressBar: {
		height: "6px",
		backgroundColor: "#e0e0e0",
		borderRadius: "3px",
		overflow: "hidden",
	},

	progressFill: {
		height: "100%",
		backgroundColor: "#0066cc",
		transition: "width 0.3s",
	},

	iframe: {
		width: "100%",
		height: "calc(100vh - 120px)",
		border: "none",
		display: "block",
	},

	loading: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "300px",
		fontSize: "1.1em",
		color: "#666",
	},

	error: {
		padding: "1em",
		backgroundColor: "#ffe6e6",
		color: "#c00",
		borderRadius: "4px",
		marginBottom: "1em",
	},
};
