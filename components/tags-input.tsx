import React, { useState } from "react";
import TagsInput from "react-tagsinput";

type TagType = "string" | "number";

type Props = {
  onTagAdded?: (value: (string | number)[]) => void;
  maxTags?: number;
  type: TagType;
};

const TagInput = ({ onTagAdded, maxTags = 3, type }: Props) => {
  const [tags, setTags] = useState<(string | number)[]>([]);

  const isValidTag = (tag: string): string | number | null => {
    if (type === "number") {
      const numberValue = parseInt(tag, 10);
      return !isNaN(numberValue) ? numberValue : null;
    }

    if (type === "string" && tag.trim()) {
      const stringValue = parseInt(tag, 10);
      return isNaN(stringValue) ? tag : null;
    }

    return null;
  };

  const addTags = (newTags: string[]) => {
    const validatedTags = newTags
      .map((tag) => isValidTag(tag))
      .filter((tag): tag is string | number => tag !== null);

    setTags(validatedTags);
    if (onTagAdded) {
      onTagAdded(validatedTags);
    }
  };

  return (
    <TagsInput
      value={tags as unknown as string[]}
      maxTags={maxTags}
      inputProps={{
        placeholder:
          tags.length === maxTags
            ? "Max limit reached"
            : "Enter days for notifications",
      }}
      onChange={(newTags) => addTags(newTags)}
    />
  );
};

export default TagInput;
