/** @jsxImportSource @emotion/react */

export default function Btn({ params }) {
  return (
    <button
      css={{
        backgroundColor: params.color,
        borderRadius: "30px",
      }}
    >
      {params.text}
    </button>
  );
}
