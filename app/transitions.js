export default function (){
	this.transition(
		this.toModel(function(toModel, fromModel) {
			return toModel && fromModel && toModel.get('index') > fromModel.get('index');
		}),
		this.use('toLeft')
	);

	this.transition(
		this.toModel(function(toModel, fromModel) {
			return toModel && fromModel && toModel.get('index') < fromModel.get('index');
		}),
		this.use('toRight')
	);
}