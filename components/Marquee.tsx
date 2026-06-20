const ITEMS = ["Python","LangChain","OpenAI","RAG","Pinecone","ChromaDB","Pandas","NumPy","SciPy","Statsmodels","Scikit-learn","QuantLib","YFinance","Next.js","React","Node.js","MySQL","Power BI","Streamlit","Git"];
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee reveal" aria-hidden="true">
      <div className="marquee-track">{row.map((t, i) => (<i key={i}>{t}</i>))}</div>
    </div>
  );
}
