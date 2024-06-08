export default function AudioComp ({audio, onClick}) {

	return(
		audio.map((item) => (
			<>
				<a>{item.name}</a>
				<div key={item.key}>
					<button onClick={() => onClick && onClick(item)}>Tocar</button>
				</div>
				<hr />
			</>
		))
	);
}