interface Props {
  params: { id: string };
}

export default function MoviePage({ params }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Movie ID: {params.id}</h1>
    </div>
  );
}
