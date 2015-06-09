function cell(x,y){
	this.x=x;
	this.y=y;
	
	this.paint = function(color){
		ctx.fillStyle = color;
		ctx.fillRect(this.x*cellWidth+2.5, this.y*cellWidth+2.5, cellWidth-5, cellWidth-5);		
		ctx.strokeStyle = color;
		ctx.strokeRect(this.x*cellWidth, this.y*cellWidth, cellWidth, cellWidth);
	}
}