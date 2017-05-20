$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this; // przyda się dla funkcji zagnieżdżonych

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(event) {
                self.addCard(new Card(prompt("Podaj nazwę karty")));
            });
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    };
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
            console.log(123)
        },
        removeColumn: function() {
            this.$element.remove();
        }

    }


    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();


        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            $card.append($cardDescription);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function() {
                self.removeCard();
            });
            $card.append($cardDelete)
            return $card;


        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }
    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
                connectWith: '.column-card-list',
                placeholder: 'card-placeholder'
            })
            .disableSelection();
    }
    $('.create-column')
        .click(function() {
            var name = prompt('Enter a column name');
            var column = new Column(name);
            board.addColumn(column);
        });
    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});