CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.books (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	is_barrowed bool DEFAULT false NULL,
	CONSTRAINT books_pkey PRIMARY KEY (id)
);

CREATE TABLE public.book_deliveries (
	id serial4 NOT NULL,
	book_id int4 NOT NULL,
	user_id int4 NOT NULL,
	picked_date timestamptz DEFAULT now() NOT NULL,
	delivered_date timestamptz NULL,
	score int4 NULL,
	CONSTRAINT book_deliveries_pkey PRIMARY KEY (id),
	CONSTRAINT book_deliveries_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON UPDATE CASCADE,
	CONSTRAINT book_deliveries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE
);