import { Fragment } from "react";

import { GoHeart, GoHeartFill, GoTrash, GoUnmute } from "react-icons/go";

export default function AudioComp ({audio, onPlay, onDelete, onFavorite}) {

	const SVG = ({src}) => {
		return(
			<img src={src} alt="Icone de favorito" width="20" height="20" />
		)
	}

	return(
		audio.map((item) => (
			<Fragment key={item.key}>
				<a>{item.name}</a>
				<div>
					<button onClick={() => onPlay && onPlay(item)}>
						<GoUnmute />
					</button>
					<button onClick={() => onDelete(item.id, item.name)}>
						<GoTrash />
					</button>
					<button onClick={() => onFavorite(item.id, item.favorite)}>
						{ item.favorite ? <GoHeartFill /> : <GoHeart /> }
					</button>
				</div>
				<hr />
			</Fragment>
		))
	);
}