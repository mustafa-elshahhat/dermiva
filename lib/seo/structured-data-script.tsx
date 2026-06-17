export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue = JsonLdPrimitive | JsonLdObject | readonly JsonLdValue[];
export interface JsonLdObject {
  readonly [key: string]: JsonLdValue | undefined;
}

export interface JsonLdScriptProps {
  data: JsonLdObject | readonly JsonLdObject[];
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
