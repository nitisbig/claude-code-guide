import { Fragment } from "react";
import type { Block } from "@/lib/concepts";
import { slugifyHeading } from "@/lib/concepts";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

/**
 * BlockRenderer — turns a lesson's structured Block[] into rendered
 * markup. Heading ids match getLessonHeadings() so the TOC anchors line
 * up. Wrap the output in a `prose` container for typography.
 *
 * In Phase 2 this is the natural seam to swap for an MDX renderer; the
 * Block union can grow without touching consumer components.
 */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>{renderBlock(block)}</Fragment>
      ))}
    </>
  );
}

function renderBlock(block: Block) {
  switch (block.type) {
    case "heading": {
      const id = slugifyHeading(block.text);
      if (block.level === 2) {
        return (
          <h2 id={id} className="scroll-mt-20">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 id={id} className="scroll-mt-20">
          {block.text}
        </h3>
      );
    }
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <Callout variant={block.variant} title={block.title}>
          {block.text}
        </Callout>
      );
    case "code":
      return <CodeBlock code={block.code} language={block.language} />;
    default:
      return null;
  }
}
