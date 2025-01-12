CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id)
);

CREATE TABLE public.books (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	score float8 DEFAULT '-1'::double precision NOT NULL,
	CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY (id)
);

CREATE TABLE public.transactions (
	id serial4 NOT NULL,
	borrowed_at timestamp NULL,
	returned_at timestamp NULL,
	rating float8 NULL,
	user_id int4 NULL,
	book_id int4 NULL,
	CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY (id),
	CONSTRAINT "FK_74f5550d011d85784a22e4dbf1c" FOREIGN KEY (book_id) REFERENCES public.books(id),
	CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY (user_id) REFERENCES public.users(id)
);