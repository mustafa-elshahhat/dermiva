import React from "react";
import { Link } from "@/i18n/navigation";
import type { CategoryViewModel } from "@/lib/types/category";
import type { ProductViewModel } from "@/lib/types/product";
import type { ProductGuidanceViewModel, QuestionAnswerViewModel, QuickFactViewModel } from "@/lib/types/content";

interface LinkItem {
  href: string;
  label: string;
}

const textStyle: React.CSSProperties = {
  fontSize: 14.5,
  color: "#7c6065",
  lineHeight: 1.65,
  margin: 0,
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #f0dde1",
  borderRadius: 20,
  padding: "clamp(18px,3vw,26px)",
};

export function PageIntro({
  eyebrow,
  title,
  body,
  links = [],
}: {
  eyebrow?: string;
  title: string;
  body: string;
  links?: LinkItem[];
}) {
  return (
    <section style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: "clamp(22px,4vw,34px)", marginBottom: 28 }}>
      {eyebrow ? <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 8 }}>{eyebrow}</div> : null}
      <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.4vw,36px)", color: "#5a4145", margin: "0 0 10px", lineHeight: 1.1 }}>{title}</h2>
      <p style={{ ...textStyle, maxWidth: 760 }}>{body}</p>
      {links.length > 0 ? (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 0, margin: "18px 0 0", listStyle: "none" }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{ display: "inline-flex", border: "1px solid #e7c9d0", borderRadius: 999, padding: "8px 14px", color: "#9a5d6a", fontSize: 13, fontWeight: 600 }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function ContentSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "clamp(32px,5vw,54px)" }}>
      <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: "#5a4145", margin: "0 0 10px" }}>{title}</h2>
      {intro ? <p style={{ ...textStyle, maxWidth: 760, marginBottom: 18 }}>{intro}</p> : null}
      {children}
    </section>
  );
}

export function QuickFacts({ title, facts }: { title: string; facts: QuickFactViewModel[] }) {
  return (
    <section style={cardStyle}>
      <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: 26, color: "#5a4145", margin: "0 0 16px" }}>{title}</h2>
      <dl style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, margin: 0 }}>
        {facts.map((fact) => (
          <div key={fact.label} style={{ borderBottom: "1px solid #f5eef0", paddingBottom: 10 }}>
            <dt style={{ fontSize: 12, color: "#a98e93", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>{fact.label}</dt>
            <dd style={{ ...textStyle, color: "#5a4145", margin: "4px 0 0" }}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function AnswerBlock({ title, items }: { title: string; items: QuestionAnswerViewModel[] }) {
  return (
    <section style={cardStyle}>
      <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: 26, color: "#5a4145", margin: "0 0 16px" }}>{title}</h2>
      <dl style={{ display: "flex", flexDirection: "column", gap: 16, margin: 0 }}>
        {items.map((item) => (
          <div key={item.question}>
            <dt style={{ fontSize: 15, color: "#4f3a3e", fontWeight: 700, marginBottom: 5 }}>{item.question}</dt>
            <dd style={{ ...textStyle, margin: 0 }}>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={cardStyle}>
      <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 12px" }}>{title}</h3>
      <ul style={{ display: "flex", flexDirection: "column", gap: 9, paddingInlineStart: 18, margin: 0 }}>
        {items.map((item) => (
          <li key={item} style={textStyle}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CategoryGuidance({
  category,
  products,
  labels,
}: {
  category: CategoryViewModel;
  products: ProductViewModel[];
  labels: {
    title: string;
    bestFor: string;
    benefits: string;
    focus: string;
    choose: string;
    questions: string;
    relatedProducts: string;
  };
}) {
  return (
    <ContentSection title={labels.title} intro={category.content.summary}>
      <div className="dm-grid-three-col">
        <BulletCard title={labels.bestFor} items={category.content.bestFor} />
        <BulletCard title={labels.benefits} items={category.content.benefits} />
        <BulletCard title={labels.focus} items={category.content.ingredients} />
      </div>
      <div className="dm-grid-responsive-two-col" style={{ marginTop: 20 }}>
        <BulletCard title={labels.choose} items={category.content.chooseGuidance} />
        <section style={cardStyle}>
          <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 12px" }}>{labels.relatedProducts}</h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: 9, padding: 0, margin: 0, listStyle: "none" }}>
            {products.slice(0, 4).map((product) => (
              <li key={product.id}>
                <Link href={product.href} style={{ color: "#9a5d6a", fontWeight: 600, fontSize: 14 }}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div style={{ marginTop: 20 }}>
        <AnswerBlock title={labels.questions} items={category.content.questionAnswers} />
      </div>
    </ContentSection>
  );
}

export function ProductQuestions({ title, guidance }: { title: string; guidance: ProductGuidanceViewModel }) {
  return <AnswerBlock title={title} items={guidance.questionAnswers} />;
}

export function ProductGuidance({
  guidance,
  labels,
}: {
  guidance: ProductGuidanceViewModel;
  labels: {
    bestFor: string;
    benefits: string;
    routine: string;
    ingredients: string;
    goodToKnow: string;
  };
}) {
  return (
    <div className="dm-grid-responsive-two-col">
      <BulletCard title={labels.bestFor} items={guidance.bestFor} />
      <BulletCard title={labels.benefits} items={guidance.benefits} />
      <BulletCard title={labels.routine} items={guidance.routineTips} />
      <BulletCard title={labels.ingredients} items={guidance.ingredientHighlights} />
      <div style={{ gridColumn: "1 / -1" }}>
        <BulletCard title={labels.goodToKnow} items={guidance.goodToKnow} />
      </div>
    </div>
  );
}
