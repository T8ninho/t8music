import { Fragment } from "react";

export default function AudioComp ({audio, onPlay, onDelete, onFavorite}) {

	return(
		audio.map((item) => (
			<Fragment>
				<a>{item.name}</a>
				<div key={item.key}>
					<button onClick={() => onPlay && onPlay(item)}>Tocar</button>
					<button onClick={() => onFavorite(item.id)}>Favoritar</button>
					<button onClick={() => onDelete(item.id, item.name)}>Excluir</button>
				</div>
				<hr />
			</Fragment>
		))
	);
}