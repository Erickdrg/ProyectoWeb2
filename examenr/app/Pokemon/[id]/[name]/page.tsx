import PokemonClient from "./PokemonClient";



export default function PokemonPage({
  params,
}: {
  params: { id: string; name: string };
})
{

  const { id, name } = params;
  return <PokemonClient id={id} name={name} />;
}
