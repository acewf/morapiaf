<?php /* UI Destaques */ ?>
<div class="page-games content">
	<nav class="nav-site">
        <div class="search">
            <div class="icon icon-search"></div>
            <input type="text">
        </div>
        <button class="menu"><span></span></button>
    </nav>
	<header class="header">
		<div class="group-type position-default coluna-one">
			<h1 class="filter-type">Ver Todos<span></span></h1>
		    <ul class="hide other">
		        <li class="filter-bt active" data-type="familia" data-filter=".category-familia">Familia</li>
		        <li class="filter-bt" data-type="festa" data-filter=".category-festa">Festa</li>
		        <li class="filter-bt" data-type="especialistas" data-filter=".category-especialistas">Especialistas</li>
		        <li class="filter-bt" data-type="classicos" data-filter=".category-classicos">Clássicos</li>
		        <li class="filter-bt" data-type="outros" data-filter=".category-outros">Outros</li>
		        <li class="filter-bt" data-type="all" data-filter="all">Ver Todos</li>
		    </ul>
	    </div>
	    <div class="coluna-two">
	    	<figure class="totem left rotate-down" style="top: -35px;"><img alt="Board Piece" src="images/peao.png"></figure>
		    <div class="linha lh-align">
			    <div class="piece-block type-game familia">
		            <div class="center-content">
		                <div class="icon icon-notepad"></div><span>Ver Todos</span>
		            </div>
		        </div>
	        </div>
	        <div class="linha outline">
                <div class="piece-block">
                    <div class="center-content">
                    	<div class="icon icon-filter"></div>
                    	<span>Filtros</span>
                    </div>
                </div>
                <div class="piece-block filter-bt">
                    <div class="center-content">
                    	<span>Tags</span>
                    	<div class="icon icon-caret-down"></div>
                    </div>
                    <div class="select-filter-option">
	                    <ul>
	                    	<li><input type="radio" name="tag" data-filter=".category-new" value="novidades">novidades</li>
	                    	<li><input type="radio" name="tag" data-filter=".category-popular" value="populares">populares</li>
	                    	<li><input type="radio" name="tag" data-filter=".category-soon" value="breve">em breve</li>
	                    </ul>
	                    <button><span></span>limpar</button>
                    </div>
                </div>
                <div class="piece-block filter-bt">
                    <div class="center-content">
                    	<span>Idade</span>
                    	<div class="icon icon-caret-down"></div>
                    </div>
                     <div class="select-filter-option">
	                    <ul>
	                    	<li><input type="radio" name="age" data-filter=".category-underage" value="under10">&lt; 10</li>
	                    	<li><input type="radio" name="age" data-filter=".category-aboveage" value="above10"> &gt; 10</li>
	                    	<li><input type="radio" name="age" data-filter=".mix" value="clear">All</li>
	                    </ul>
	                    <button><span></span>limpar</button>
                    </div>
                </div>
                <div class="piece-block filter-bt">
                    <div class="center-content">
                    	<span>Jogadores</span>
                    	<div class="icon icon-caret-down"></div>
                    </div>
                     <div class="select-filter-option">
	                    <ul>
	                    	<li><input type="radio" name="players" data-filter=".category-single" value="one player">1 Player</li>
	                    	<li><input type="radio" name="players" data-filter=".category-double" value="two or more players">2+ Players</li>
	                    	<li><input type="radio" name="players" data-filter=".category-crowed" value="more four">4+ Players</li>
	                    </ul>
	                    <button><span></span>limpar</button>
                    </div>
                </div>
                <div class="piece-block filter-bt">
                    <div class="center-content">
                    	<span>Tempo</span>
                    	<div class="icon icon-caret-down"></div>
                    </div>
                     <div class="select-filter-option">
	                    <ul>
	                    	<li><input type="radio" name="time" data-filter=".category-shortgame" value="novidades">0h-1h</li>
	                    	<li><input type="radio" name="time" data-filter=".category-normalgame" value="populares">1h-3h</li>
	                    	<li><input type="radio" name="time" data-filter=".category-longgame" value="breve">+ 3h</li>
	                    </ul>
	                    <button><span></span>limpar</button>
                    </div>
                </div>
            </div>
        </div>
	</header>
	<section id="games-items" class="games-items">
	   <figure class="info-game show-up mix category-familia category-new category-double category-normalgame">
            <div class="show-board">
            	<div class="img-wrapper">
                	<img alt="game image" src="images/gifttrap.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Uma versão revista e aumentada do STOP.	</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-familia category-popular category-double category-shortgame">
            <div class="show-board">
            	<div class="box-highlight">Em Breve</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/gifttrap.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-festa">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/gifttrap.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-festa category-single category-longgame">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/gifttrap.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-especialistas category-single">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/gifttrap-box.png">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-especialistas category-single category-underage">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
            	<div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>Jogo Blue Lion</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure>
        <!---- MIDDLE DISPLAY PART ---->
        <div class="featured-box">
        	<h2>Não Percas</h2>
        	<h6>São totalmente irresistíveis.</h6>
        	<div class="featured-item mix category-especialistas">
		        <div class="centerme">
		            <div class="show-board">
		                <div class="img-wrapper">
		                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
		                </div>
		                <figcaption>
		                    <h2>GIFT TRAP</h2>
		                    <h3>Quem não gosta de receber presentes?</h3>
		                </figcaption>
		            </div>
		        </div>
		        <div class="masker">
		        	<div class="box-highlight">Esgotado</div>
		        </div>
		    </div><div class="featured-item mix category-classicos">
		        <div class="centerme">
		            <div class="show-board">
		                <img alt="game image" src="images/gifttrap.png" style="left: -3px;">
		                <figcaption>
		                    <h2>GIFT TRAP</h2>
		                    <h3>Quem não gosta de receber presentes?</h3>
		                </figcaption>
		            </div>
		        </div>
		        <div class="masker">
		        	<div class="box-highlight">Esgotado</div>
		        </div>
		    </div>
        </div>
        <!---- SECOND PART ---->
        <figure class="info-game show-up mix category-classicos">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-classicos category-single">
            <div class="show-board">
            	<div class="box-highlight">Esgotado</div>
                <div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-classicos category-double">
            <div class="show-board">
                <div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-outros">
            <div class="show-board">
                <div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure><figure class="info-game show-up mix category-outros">
            <div class="show-board">
                <div class="img-wrapper">
                	<img alt="game image" src="images/jogo-blue-lion.png" style="left: -3px;">
                </div>
                <figcaption>
                    <h2>GIFT TRAP</h2>
                    <h3>Quem não gosta de receber presentes?</h3>
                </figcaption>
            </div>
            <div class="info-game-hover">
                <a href="game-x">
                    <div class="box-highlight">Em Breve</div>
                    <h2>GIFT TRAP</h2>
                    <div class="author-board">Criado por Nick Kellet</div>
                    <div class="board-info"><span>+9</span><span>2 jogadores</span><span>45-60 min</span></div>
                    <div class="icon icon-arrow-right"></div>
                </a>
            </div>                     
        </figure>
	</section>
	<script>
    if (typeof requirejs == 'function') {
        requirejs(['appgames'],function(module){
            try{
                console.log('Can Init Class App Main');
                //appmenu.addModule(module);
                module.init();
            }catch(err) {
                console.log(err.message);
            }  
        });
    }
    </script>
</div>