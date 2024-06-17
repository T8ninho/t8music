import { Fragment } from "react";

import { GoHeart, GoHeartFill, GoTrash, GoUnmute } from "react-icons/go";

export default function MusicItem ({audio, onPlay, onDelete, onFavorite}) {
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