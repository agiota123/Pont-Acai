import { useMemo, useState } from 'react';
import { ShoppingBag, Search, Star, MapPin, Clock3, Instagram, X, Plus, Minus, Trash2, ArrowRight, Phone, ChevronRight, Sparkles, Utensils, MessageCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import pizzaPromos from '@assets/unnamed_(1)_1789000615071.webp';
import pizzaTraditional from '@assets/unnamed_1789000615124.webp';
import hotdogMenu from '@assets/unnamed_(2)_1789000615004.webp';
import burgerMenu from '@assets/unnamed_(3)_1789000614965.webp';
import acaiPhoto from '@assets/unnamed_(4)_1789000614923.webp';
import storefront from '@assets/Screenshot_20260909-210416_Chrome~2_1789000635457.jpg';
import cinematicAcai from '@assets/generated_images/pont-acai-cinematic-acai.jpg';
import cinematicPizza from '@assets/generated_images/pont-acai-cinematic-pizza.jpg';
import cinematicBurger from '@assets/generated_images/pont-acai-cinematic-burger.jpg';
import cinematicToppings from '@assets/generated_images/pont-acai-cinematic-toppings.jpg';
import brandLogo from '@assets/generated_images/pont-acai-logo.png';

type Category = 'destaques' | 'acai' | 'cupuaçu' | 'pizza' | 'burger' | 'hotdog' | 'porções' | 'bebidas';
type Product = { id: string; name: string; description: string; price: number; category: Category; image?: string; badge?: string; needsNotes?: boolean };
type Extra = { name: string; price: number };
type CartLine = { key: string; product: Product; quantity: number; extras: Extra[]; notes: string };

const acai: Product[] = ([
  ['Batida com Creme de Ninho 500ml','Açaí cremoso, leite condensado, leite Ninho e creme de Ninho',21.99,'batida'],
  ['Batida com Nutella 500ml','Açaí cremoso, leite condensado, leite Ninho e creme de avelã',24.99,'batida'],
  ['Batida com Paçoca 500ml','Açaí cremoso, leite condensado, leite Ninho, paçoca',18.99,'batida'],
  ['Batida tradicional 500ml','Açaí, leite condensado, banana e leite Ninho',17.99,'batida'],
  ['Açaí chocookies 500ml','Açaí, Chocoball, creme de cookies, leite Ninho e kiwi',26.99,'acai','Queridinho'],
  ['Açaí com Creme de Ferrero Rocher 500ml','Açaí, leite Ninho, leite condensado, amendoim e creme de Ferrero Rocher',33,'acai'],
  ['Açaí com Creme de Ferrero Rocher 700ml','Açaí, leite Ninho, leite condensado, amendoim e creme de Ferrero Rocher',42,'acai'],
  ['Açaí Creme de Ninho 500ml','Açaí, leite condensado, creme de Ninho, leite Ninho e bombom Ouro Branco',26.99,'acai'],
  ['Açaí Creme de Ninho 700ml','Açaí, leite condensado, leite Ninho, creme de Ninho e bombom Ouro Branco',31.99,'acai'],
  ['Açaí Creme de Ovomaltine 500ml','Açaí, leite Ninho, Ovomaltine, leite condensado, creme de Ovomaltine e 1 Bis Hershey’s',26.99,'acai'],
  ['Açaí Raffaello 500ml','Açaí, Nutella, creme de cookies, Chocoball, leite Ninho e brigadeiro Raffaello',26.99,'acai'],
  ['Açaí 3 Bis 500ml','Açaí, leite condensado, leite Ninho, Nutella, Bis branco, Bis Black e Bis tradicional',26.99,'acai'],
  ['Oreo com Nutella 500ml','Açaí, leite condensado, leite Ninho, Nutella e Oreo',26.99,'acai','Mais pedido'],
  ['Oreos com Nutella 700ml','Açaí, leite condensado, leite Ninho, Nutella e Oreo',31.99,'acai'],
  ['Açaí com Prestígio 700ml','Açaí + Prestígio + leite condensado + morango + leite Ninho',31.99,'acai'],
  ['Combo Família P','3 açaís de 500ml. Escolha os sabores e informe no pedido.',72.99,'acai','Para dividir',true],
  ['Açaí KitKat e Morango 500ml','Açaí, leite condensado, leite Ninho, KitKat e morango',25.99,'acai'],
  ['Combo Família MM','4 açaís de 500ml. Escolha os sabores e informe no pedido.',81.99,'acai','Para dividir',true],
  ['Combo Família GG','5 açaís de 500ml. Escolha os sabores e informe no pedido.',101.99,'acai','Para dividir',true],
  ['Mega Promoção — 3 açaís de 700ml','Informe no pedido os sabores dos açaís.',88.99,'acai','Promo',true],
  ['Mega Promoção — 2 açaís de 700ml','Informe no pedido os sabores dos açaís.',59.99,'acai','Promo',true],
  ['2 copos Açaí tradicional 500ml','Banana, morango, leite Ninho, leite condensado e granola',45.99,'acai','Para dividir'],
  ['2 copos Açaí Prestígio 500ml','Chocolate Prestígio, leite Ninho, leite condensado, coco ralado e Nutella',45.99,'acai'],
  ['Açaí Puro 500ml','Açaí sem ingredientes',24.99,'acai'],
  ['Açaí Puro 700ml','Açaí sem ingredientes',29.99,'acai'],
  ['Açaí com Kiwi e Nutella 700ml','Açaí + kiwi + leite condensado + Nutella + amendoim',31.99,'acai'],
  ['Açaí com Kiwi e Nutella 500ml','Açaí + kiwi + leite condensado + Nutella + amendoim',26.99,'acai'],
  ['Açaí com Chocolate M&M’s 500ml','Açaí + M&M’s + amendoim + leite Ninho + leite condensado',26.99,'acai'],
  ['Açaí com Chocolate M&M’s 700ml','Açaí + M&M’s + amendoim + leite condensado + leite Ninho',31.99,'acai'],
  ['Açaí Love Nutella 700ml','Açaí + leite condensado + Nutella + morango + Sonho de Valsa + leite Ninho + paçoca',31.99,'acai'],
  ['Açaí Love Nutella 500ml','Açaí, leite condensado, Nutella, morango, Sonho de Valsa, leite Ninho e paçoca',28.99,'acai'],
  ['Açaí Oreo com Morango 500ml','Açaí, Oreo, morango, leite Ninho e leite condensado',25.99,'acai'],
  ['Açaí Oreo com Morango 700ml','Açaí + Oreo + morango + leite Ninho + leite condensado',29.99,'acai'],
  ['Açaí Bis 500ml','Açaí, leite condensado, Nutella, leite Ninho, banana e chocolate Bis',25.99,'acai'],
  ['Açaí Bis 700ml','Açaí + leite condensado + Nutella + leite Ninho + banana + chocolate Bis',29.99,'acai'],
  ['Prime Negresco 700ml','Açaí + Nutella + leite Ninho + Negresco + leite condensado',29.99,'acai'],
  ['Prime Negresco 500ml','Açaí + Nutella + leite Ninho + Negresco + leite condensado',25.99,'acai'],
  ['Açaí Oreo com KitKat 700ml','Açaí, Oreo, KitKat, leite condensado e leite Ninho',29.99,'acai'],
  ['Açaí Oreo com KitKat 500ml','Açaí, Oreo, KitKat, leite condensado e leite Ninho',25.99,'acai'],
  ['Açaí com Banana 700ml','Açaí + leite condensado + granola + leite Ninho + banana',29.99,'acai'],
  ['Açaí com Banana 500ml','Açaí, leite condensado, granola, leite Ninho e banana',25.99,'acai'],
  ['Açaí Fitness 700ml','Banana, kiwi, morango, mel e granola',29.99,'acai'],
  ['Açaí Fitness 500ml','Açaí puro + banana + granola + kiwi + morango e mel',26.99,'acai'],
  ['Açaí Mix Fruta 700ml','Banana, kiwi, morango, leite condensado e granola',39.91,'acai'],
  ['Açaí Mix Fruta 500ml','Banana, kiwi, morango, leite condensado e granola',26.99,'acai'],
  ['Açaí Morango com Nutella 500ml','Leite condensado, Nutella, morango e leite Ninho',27.99,'acai'],
  ['Açaí Morango com Nutella 700ml','Açaí + leite condensado + Nutella + morango + leite Ninho',31.99,'acai'],
  ['Açaí Nutella com Banana 700ml','Açaí + leite condensado + Nutella + leite Ninho + Ovomaltine + banana',31.99,'acai'],
   ['Açaí Nutella com Banana 500ml','Açaí, leite condensado, Nutella, leite Ninho, Ovomaltine e banana',26.99,'acai'],
   ['Açaí Kiwi e Morango 700ml','Açaí + kiwi + morango + leite condensado + leite Ninho',29.99,'acai'],
  ['Açaí Kiwi e Morango 500ml','Açaí + kiwi + morango + leite condensado + leite Ninho',26.99,'acai'],
   ['Açaí Disquete 500ml','Chocolate Disquete, leite Ninho e leite condensado',25.99,'acai'],
   ['Açaí Jujubinha 500ml','Leite Ninho, leite condensado, jujuba e Confete',25.99,'acai'],
   ['Açaí Talento 500ml','Açaí, leite condensado, leite Ninho, Nutella e Talento',25.99,'acai'],
   ['Açaí Rocks Ovomaltine 500ml','Leite Ninho, leite condensado, Nutella e Rocks Ovomaltine',26.99,'acai'],
   ['Açaí Rock Ovomaltine 700ml','Leite Ninho, leite condensado, Nutella e Rocks Ovomaltine',31.99,'acai'],
  ['Açaí da Felicidade 500ml','Açaí de 500ml, calda de chocolate, Nutella, banana, Chocoball e morango',26.99,'acai','Assinatura'],
  ['Açaí Felicidade 700ml','Calda de chocolate, Nutella, banana, morango e Chocoball',31.99,'acai'],
  ['Açaí Ovomaltine e Morango 500ml','Açaí, leite Ninho, leite condensado, morango e Ovomaltine',25.99,'acai'],
  ['KitKat com Nutella 500ml','Açaí + Nutella + leite Ninho + leite condensado + KitKat',26.99,'acai'],
  ['KitKat com Nutella 700ml','Açaí + Nutella + leite Ninho + leite condensado + KitKat',31.99,'acai'],
   ['Açaí KitKat e Morango 700ml','Açaí + leite condensado + leite Ninho + KitKat + morango',28.99,'acai'],
  ['Açaí com Prestígio 500ml','Açaí, chocolate Prestígio + leite condensado + morango + leite Ninho',25.99,'acai'],
  ['Açaí Chokito 500ml','Açaí, calda de chocolate, banana, Ovomaltine, creme de avelã e Chokito',25.99,'acai'],
   ['Açaí Ferrero Rocher 500ml','Açaí, leite Ninho, leite condensado, amendoim, Nutella e 1 bombom Ferrero Rocher',26.99,'acai'],
   ['Açaí Ferrero Rocher 700ml','Açaí, leite Ninho, leite condensado, Nutella, amendoim e 2 bombons Ferrero Rocher',31.99,'acai'],
  ['Açaí Kinder Bueno 500ml','Açaí, leite Ninho, leite condensado, Nutella e Kinder Bueno',26.99,'acai'],
  ['Açaí Kinder Bueno 700ml','Açaí, leite Ninho, leite condensado, Nutella e Kinder Bueno',31.99,'acai'],
  ['Açaí Tropical 500ml','Açaí, leite condensado, leite Ninho, kiwi, morango e uva',26.99,'acai'],
  ['Açaí Tropical 700ml','Açaí, leite Ninho, leite condensado, kiwi, morango e uva',31.99,'acai'],
  ['Love Banana 500ml','Açaí, Nutella, leite Ninho, leite condensado, paçoca, banana e Ouro Branco',26.99,'acai'],
  ['Love Banana 700ml','Açaí, leite Ninho, leite condensado, paçoca, Nutella, banana e Ouro Branco',31.99,'acai'],
  ['Love Uva 500ml','Açaí, leite Ninho, leite condensado, Nutella, uva e amendoim',26.99,'acai'],
   ['Love Uva 700ml','Açaí, leite Ninho, leite condensado, Nutella, uva e amendoim',29.99,'acai'],
   ['Açaí Chocouva 500ml','Açaí, Chocoball, uva, banana, leite Ninho e Nutella',26.99,'acai'],
  ['Açaí Chocouva 700ml','Açaí, Chocoball, uva, banana, leite Ninho e Nutella',31.99,'acai'],
] as const).map((p, i) => ({ id: `a${i}`, name: p[0], description: p[1], price: p[2], category: p[3] === 'batida' ? 'acai' : 'acai', badge: typeof p[4] === 'string' ? p[4] : undefined, needsNotes: p[5] === true }));

const cupuacu: Product[] = ([
  ['Açaí + Cupuaçu 500ml','Cupuaçu, leite condensado, açaí e leite Ninho',25.99,'cupuaçu'],
  ['Açaí + Cupuaçu 700ml','Açaí, leite condensado, leite Ninho e cupuaçu',29.99,'cupuaçu'],
  ['Casadinho 500ml','Cupuaçu, açaí, morango e Nutella',25.99,'cupuaçu'],
  ['Cassadinho 700ml','Cupuaçu, açaí, morango e Nutella',29.99,'cupuaçu'],
  ['Cupuaçu BisBis 700ml','Cupuaçu, leite Ninho, leite condensado, banana, Bis e Nutella',29.99,'cupuaçu'],
  ['Cupuaçu com Nutella e Bis 500ml','Cupuaçu, leite condensado, Nutella, Bis, leite Ninho e banana',25.99,'cupuaçu'],
  ['Cupuaçu de Morango 500ml','Cupuaçu, leite condensado, granola, morango e leite Ninho',25.99,'cupuaçu'],
  ['Cupuaçu de Morango 700ml','Cupuaçu, leite condensado, granola, morango e leite Ninho',29.99,'cupuaçu'],
  ['Cupuaçu e Banana','Cupuaçu, banana, leite condensado, granola e leite Ninho',25.99,'cupuaçu'],
  ['Cupuaçu e Banana 700ml','Cupuaçu, leite Ninho, leite condensado, banana e granola',29.99,'cupuaçu'],
  ['Cupuaçu Morango e Kiwi 500ml','Cupuaçu, morango, kiwi, leite Ninho e leite condensado',25.99,'cupuaçu'],
  ['Cupuaçu Morango e Kiwi 700ml','Cupuaçu, leite Ninho, leite condensado, morango e kiwi',29.99,'cupuaçu'],
  ['Cupuaçu Nutella','Cupuaçu, morango, Nutella, leite Ninho e leite condensado',26.99,'cupuaçu'],
  ['Cupuaçu Nutella 700ml','Cupuaçu, morango, leite condensado, leite Ninho e Nutella',29.99,'cupuaçu'],
] as const).map((p, i) => ({ id: `c${i}`, name: p[0], description: p[1], price: p[2], category: p[3] }));

const pizzas: Product[] = ([
  ['Mussarela','Mussarela, molho, tomate, azeitona e orégano',34.99,'pizza'],['Marguerita','Mussarela, molho, tomate, manjericão e orégano',34.99,'pizza'],['Presunto','Mussarela, molho, presunto, tomate e orégano',34.99,'pizza'],['Milho','Mussarela, molho, milho e orégano',34.99,'pizza'],['Milho c/ Catupiry','Mussarela, molho, milho, catupiry e orégano',34.99,'pizza'],['Calabresa','Mussarela, molho, calabresa, cebola e orégano',39.99,'pizza','Pont'],['Calabresa picante','Mussarela, molho, calabresa, pimenta calabresa, cebola e orégano',39.99,'pizza','Pont'],['Napolitano','Mussarela, molho, presunto, tomate, pimentão e orégano',39.99,'pizza'],['Frango','Mussarela, molho, frango, milho e orégano',39.99,'pizza'],['Frango c/ Catupiry','Mussarela, molho, frango, catupiry, milho e orégano',39.99,'pizza','Pont'],['Portuguesa','Mussarela, molho, ovo, cebola, presunto, calabresa, pimentão, azeitona e orégano',39.99,'pizza'],['Americana','Mussarela, molho, pepperoni, cebola e orégano',39.99,'pizza'],['Atum','Muçarela, molho, cebola, atum, azeitona e orégano',49.99,'pizza'],['Vegetariana','Muçarela, molho, cebola, milho, tomate, azeitona, palmito, champignon e orégano',39.99,'pizza'],['Francesa','Muçarela, molho, tomate, calabresa, presunto e orégano',39.99,'pizza'],['A moda','Muçarela, molho, cebola, calabresa, tomate, milho, bacon, pimentão, ovo, azeitona e orégano',54.99,'pizza','Especial'],['4 queijos','Muçarela, molho, provolone, queijo prato, queijo e orégano',54.99,'pizza','Especial'],['Lombo','Muçarela, molho, lombo, catupiry e orégano',44.99,'pizza'],['Frango caipira','Muçarela, molho, frango, milho, bacon, azeite e orégano',44.99,'pizza'],['Bacon','Muçarela, molho, bacon, azeitona e orégano',44.99,'pizza'],['Carne seca','Muçarela, molho, carne seca, catupiry e orégano',59.99,'pizza','Especial'],['Romeu e Julieta','Muçarela, goiabada e creme de leite',44.99,'pizza','Doce'],['Morango c/ chocolate','Muçarela, morango e chocolate',49.99,'pizza','Doce'],['Morango c/ Nutella','Muçarela, morango e Nutella',59.99,'pizza','Doce'],['Prestígio','Muçarela, chocolate e coco ralado',39.99,'pizza','Doce'],['Kit Kat','Muçarela, chocolate e Kit Kat',44.99,'pizza','Doce'],['M&M','Muçarela, chocolate e confete',44.99,'pizza','Doce'],['Brigadeiro','Muçarela, chocolate e granulado',44.99,'pizza','Doce'],['Beijinho','Muçarela, leite condensado, coco ralado e cravo',44.99,'pizza','Doce'],['Chocolate','Muçarela e chocolate',44.99,'pizza','Doce'],
] as const).map((p, i) => ({ id: `p${i}`, name: p[0], description: p[1], price: p[2], category: p[3], badge: p[4] }));

const burgers: Product[] = ([
  ['X-burgue','Pão, carne, mussarela e molho',9,'burger'],['X-salada','Pão, carne, mussarela, alface e tomate',11,'burger'],['X-hambug','Pão, carne, mussarela, tomate e alface',13,'burger'],['X-especial','Pão, 2 carnes de hambúrguer, mussarela, batata palha, salada e molho',15,'burger'],['X-calabresa','Pão, calabresa, carne, bacon, presunto, mussarela, milho, alface, tomate e batata palha',16,'burger'],['X-bacon','Pão, carne, bacon, presunto, mussarela, milho, salada, batata palha e molho',16,'burger'],['X-egg bacon','Pão, carne, ovo, bacon, presunto, mussarela, milho, tomate, alface e batata palha',17,'burger'],['X-egg','Pão, carne, ovo, presunto, mussarela, milho e salada',15,'burger'],['X-tudo especial','Pão, carne, bacon, salsicha, presunto, mussarela, ovo, milho, catupiry, tomate, alface e batata palha',19,'burger','Mais pedido'],['X-mickey','Pão, 2 carnes, mussarela, presunto, bacon, milho, salsicha, ovo, tomate, alface, batata palha e molho',21,'burger'],['X-baby-bife','Pão, 2 carnes, presunto, mussarela, 2 ovos, tomate, alface e batata palha',20,'burger'],['X-lombo','Pão, carne, lombo, catupiry, presunto, mussarela, bacon, ovo, tomate, alface e batata palha',19,'burger'],['Batata frita - G','Batata simples',19,'porções'],['Batata c/ bacon','Batata, bacon e catupiry',28,'porções'],['Batata recheada','Batata, bacon, calabresa, catupiry e cheddar',35,'porções'],['Batata Premium','Batata, mussarela, calabresa, catupiry e cheddar',40,'porções'],['Batata média','Batata média',15,'porções'],['Batata P','Batata pequena',12,'porções'],
] as const).map((p, i) => ({ id: `b${i}`, name: p[0], description: p[1], price: p[2], category: p[3], badge: p[4] }));

const hotdogs: Product[] = ([
  ['01. Simples','Pão, salsicha, mussarela, presunto, milho e batata palha',9,'hotdog'],
  ['02. Dog acebolado','Pão, salsicha, mussarela, presunto, bacon, catupiry, milho, cebola e batata palha',15,'hotdog'],
  ['03. Bog-bacon','Pão, salsicha, mussarela, presunto, milho, bacon, vinagrete e batata palha',17,'hotdog'],
  ['04. Dog-bomba','Pão, salsicha, mussarela, presunto, calabresa, ovo, hambúrguer, milho, vinagrete e batata palha',25,'hotdog','Grandão'],
  ['05. Dog-calabresa','Pão, salsicha, mussarela, presunto, calabresa, vinagrete e batata palha',18,'hotdog'],
  ['06. Dog-especial','Pão, salsicha, mussarela, presunto, bacon, catupiry, tomate, milho e batata palha',15,'hotdog','Favorito'],
  ['07. Dog-tradicional','Pão, salsicha, mussarela, presunto, milho e vinagrete',14,'hotdog'],
] as const).map((p, i) => ({ id: `h${i}`, name: p[0], description: p[1], price: p[2], category: p[3], badge: p[4] }));
const hotdogTrios: Product[] = ([
  ['Trio Simples','Dog simples + acompanhamento + bebida',19],
  ['Trio Dog acebolado','Dog acebolado + acompanhamento + bebida',25],
  ['Trio Bog-bacon','Bog-bacon + acompanhamento + bebida',27],
  ['Trio Dog-bomba','Dog-bomba + acompanhamento + bebida',35],
  ['Trio Dog-calabresa','Dog-calabresa + acompanhamento + bebida',28],
  ['Trio Dog-especial','Dog-especial + acompanhamento + bebida',25],
  ['Trio Dog-tradicional','Dog-tradicional + acompanhamento + bebida',24],
] as const).map((p, i) => ({ id: `ht${i}`, name: p[0], description: p[1], price: p[2], category: 'hotdog' as Category, badge: 'Trio' }));

const extras: Extra[] = ([['Amendoim',3],['Creme de Ninho',6],['Creme de Oreos',6],['Flocos de arroz',4],['Flocos de arroz Nutella',6],['Leite condensado',4],['Granulado',4],['Granola',4],['Leite em pó',4],['Mel',4],['Ovomaltine',4],['Confete',4],['Chocoball',4],['Paçoca',4]] as const).map(([name, price]) => ({ name, price }));
const drinks = [['Água','Água mineral',3.5,'bebidas'],['Coca-Cola 600ml','Refrigerante gelado',7.99,'bebidas'],['Coca-Cola 2L','Refrigerante gelado',13,'bebidas'],['Guaraná Antarctica 2L','Refrigerante gelado',13,'bebidas'],['Sukita 2L','Refrigerante gelado',10.5,'bebidas'],['Kuat 1,5L','Refrigerante gelado',8.5,'bebidas'],['Fanta Laranja 2L','Refrigerante gelado',11,'bebidas'],['Fanta Uva 2L','Refrigerante gelado',12,'bebidas'],['Mineiro 2L','Refrigerante gelado',12,'bebidas'],['Suco 1L','Uva, pêssego, laranja, goiaba ou limão',9,'bebidas'],['Coca lata','Lata gelada',7.5,'bebidas'],['Mini coca','Lata mini',6,'bebidas']] as const;
const drinksMapped: Product[] = drinks.map((p, i) => ({ id: `d${i}`, name: p[0], description: p[1], price: p[2], category: p[3] }));
const allProducts: Product[] = [...acai, ...cupuacu, ...pizzas, ...burgers, ...hotdogs, ...hotdogTrios, ...drinksMapped, { id:'combo-litro', name:'Potão de 1 litro', description:'Açaí para compartilhar, do jeitinho Pont.', price:40, category:'acai', badge:'Combo', needsNotes:true }];
const categories: { id: Category; label: string }[] = [{ id:'destaques', label:'Destaques' }, { id:'acai', label:'Açaí & batidas' }, { id:'cupuaçu', label:'Cupuaçu' }, { id:'pizza', label:'Pizzaria' }, { id:'burger', label:'Burgers' }, { id:'hotdog', label:'Hot dog' }, { id:'porções', label:'Porções' }, { id:'bebidas', label:'Bebidas' }];

const money = (value: number) => value.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const imageFor = (product: Product) => product.category === 'pizza' ? cinematicPizza : product.category === 'burger' || product.category === 'porções' ? cinematicBurger : product.category === 'hotdog' ? hotdogMenu : product.category === 'bebidas' ? storefront : product.category === 'cupuaçu' ? cinematicToppings : cinematicAcai;

function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  return <article className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#271535] transition-transform duration-300 hover:-translate-y-1" data-testid={`card-product-${product.id}`}>
    <button onClick={() => onOpen(product)} className="w-full text-left" data-testid={`button-open-${product.id}`}>
      <div className="relative h-32 overflow-hidden sm:h-36">
        <img src={imageFor(product)} alt="" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#271535] via-transparent to-transparent" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#f9c72b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#25102e]">{product.badge}</span>}
        <span className="absolute bottom-3 right-3 rounded-full bg-[#f9c72b] px-2.5 py-1 text-sm font-bold text-[#25102e]">{money(product.price)}</span>
      </div>
      <div className="p-4"><h3 className="display text-base font-bold leading-tight text-[#fff7df]">{product.name}</h3><p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#c9b9ce]">{product.description}</p></div>
    </button>
    <div className="px-4 pb-4"><button onClick={() => onOpen(product)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f9c72b]/50 py-2 text-xs font-bold text-[#f9c72b] transition hover:bg-[#f9c72b] hover:text-[#25102e]" data-testid={`button-add-${product.id}`}><Plus size={14} /> Adicionar</button></div>
  </article>;
}

function App() {
  const [category, setCategory] = useState<Category>('destaques');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  const featured = allProducts.filter((p) => ['Açaí chocookies 500ml','Oreo com Nutella 500ml','Açaí da Felicidade 500ml','X-tudo especial','Calabresa'].includes(p.name));
  const filtered = useMemo(() => {
    const needle = search.toLocaleLowerCase();
    return allProducts.filter((p) => (category === 'destaques' ? featured.includes(p) : p.category === category) && (!needle || `${p.name} ${p.description}`.toLocaleLowerCase().includes(needle)));
  }, [category, search]);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price + item.extras.reduce((s, e) => s + e.price, 0)) * item.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const openProduct = (product: Product) => { setSelected(product); setQuantity(1); setNotes(''); setSelectedExtras([]); };
  const addToCart = () => {
    if (!selected) return;
    const key = `${selected.id}-${selectedExtras.map((e) => e.name).join('|')}-${notes}`;
    setCart((current) => { const existing = current.find((i) => i.key === key); return existing ? current.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) : [...current, { key, product: selected, quantity, extras: selectedExtras, notes }]; });
    setSelected(null); setToast('Pedido atualizado no carrinho'); setCartOpen(true); window.setTimeout(() => setToast(''), 2600);
  };
  const changeLine = (key: string, delta: number) => setCart((current) => current.map((i) => i.key === key ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter((i) => i.quantity > 0));
  const sendWhatsApp = () => {
    const lines = cart.map((i) => `• ${i.quantity}x ${i.product.name}${i.extras.length ? ` | Adicionais: ${i.extras.map((e) => e.name).join(', ')}` : ''}${i.notes ? ` | Obs: ${i.notes}` : ''} — ${money((i.product.price + i.extras.reduce((s, e) => s + e.price, 0)) * i.quantity)}`).join('\n');
    const message = `Olá, Pont Açaí! Quero fazer um pedido:\n\n${lines}\n\nSubtotal: ${money(subtotal)}\nTotal: ${money(subtotal)}\n\nPode confirmar o pedido e o prazo de entrega?`;
    window.open(`https://wa.me/556191193991?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const scrollMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior:'smooth' });

  return <div className="app-noise min-h-[100dvh] overflow-x-hidden bg-[#1a1022]">
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#1a1022]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="flex items-center gap-3" data-testid="button-home">
          <img src={brandLogo} alt="Pont Açaí" className="h-12 w-[118px] object-contain" />
        </button>
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#cfbed4] md:flex"><a href="#menu" className="transition hover:text-[#f9c72b]">Cardápio</a><a href="#historia" className="transition hover:text-[#f9c72b]">Nossa vibe</a><a href="#visite" className="transition hover:text-[#f9c72b]">Onde estamos</a></nav>
        <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#f9c72b] px-4 py-2.5 text-sm font-bold text-[#25102e] transition hover:bg-[#ffe17a]" data-testid="button-open-cart"><ShoppingBag size={17} /><span className="hidden sm:inline">Seu pedido</span>{itemCount > 0 && <b className="cart-pop absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ed4f98] px-1 text-[10px] text-white">{itemCount}</b>}</button>
      </div>
    </header>

    <main>
      <section className="relative min-h-[680px] overflow-hidden border-b border-[#f9c72b]/20 pt-[76px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(157,48,157,.52),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(91,31,117,.46),transparent_35%)]" />
        <div className="absolute -right-44 top-32 h-[520px] w-[520px] rounded-full border border-[#f9c72b]/20 lg:right-[-90px]" />
        <div className="absolute -right-24 top-48 h-[340px] w-[340px] rounded-full border border-[#ed4f98]/20" />
        <div className="relative mx-auto grid min-h-[604px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="reveal max-w-2xl">
            <p className="eyebrow mb-5">Aberto hoje até 23h · Valparaíso de Goiás</p>
            <h1 className="display text-[clamp(3.25rem,8vw,7.8rem)] font-bold leading-[.87] tracking-[-.075em] text-[#fff7df]">Seu momento<br /><span className="text-[#f9c72b]">pede Pont.</span></h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-[#d8c8d9]">Açaí carregado, pizza de massa artesanal e lanche sem miséria. Tudo do seu jeito, para qualquer vontade.</p>
            <div className="mt-9 flex flex-wrap gap-3"><button onClick={scrollMenu} className="group flex items-center gap-3 rounded-full bg-[#f9c72b] px-6 py-3.5 font-bold text-[#25102e] transition hover:gap-5 hover:bg-[#ffe17a]" data-testid="button-see-menu">Ver o cardápio <ArrowRight size={18} /></button><a href="https://www.instagram.com/Pont_acaii" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-[#fff7df] transition hover:border-[#f9c72b] hover:text-[#f9c72b]" data-testid="link-instagram"><Instagram size={17} /> @Pont_acaii</a></div>
            <div className="mt-12 flex gap-8 border-t border-white/10 pt-6"><div><span className="flex items-center gap-1.5 text-[#f9c72b]"><Star size={15} fill="currentColor" /> <b className="text-lg">4,9</b></span><span className="text-xs text-[#a997ad]">avaliação no cardápio</span></div><div><span className="display block text-lg font-bold text-[#fff7df]">Sem mínimo</span><span className="text-xs text-[#a997ad]">peça o que quiser</span></div><div><span className="display block text-lg font-bold text-[#fff7df]">23:00</span><span className="text-xs text-[#a997ad]">fecha hoje</span></div></div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px] reveal [animation-delay:.15s]">
            <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-[#f9c72b]/15 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#f9c72b]/70 bg-[#46185d] p-2 shadow-2xl shadow-[#100815]"><img src={acaiPhoto} alt="Açaí Pont com coberturas" className="h-[460px] w-full rounded-[1.4rem] object-cover" /><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-[#24112e]/80 p-4 backdrop-blur-md"><span className="eyebrow">O favorito da casa</span><p className="display mt-1 text-xl font-bold">Açaí com coragem.</p></div></div>
            <div className="absolute -bottom-5 -left-8 flex rotate-[-6deg] items-center gap-2 rounded-xl bg-[#ed4f98] px-4 py-3 text-sm font-bold text-white shadow-lg"><Sparkles size={16} /> feito na hora</div>
          </div>
        </div>
      </section>

      <section id="historia" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <div><p className="eyebrow">Comida que vira rolê</p><h2 className="display mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight text-[#fff7df] sm:text-5xl">Da calçada para o seu <span className="text-[#f9c72b]">coração.</span></h2></div>
        <div className="grid gap-6 sm:grid-cols-2"><div className="border-l-2 border-[#f9c72b] pl-5"><Utensils className="mb-4 text-[#f9c72b]" size={22} /><h3 className="display text-xl font-bold">Sem economia no recheio</h3><p className="mt-2 text-sm leading-relaxed text-[#bbaabd]">Porções generosas, toppings até a borda e aquela mistura improvável que dá vontade de pedir de novo.</p></div><div className="border-l-2 border-[#ed4f98] pl-5"><Clock3 className="mb-4 text-[#ed4f98]" size={22} /><h3 className="display text-xl font-bold">Seu pós-aula, pós-trampo</h3><p className="mt-2 text-sm leading-relaxed text-[#bbaabd]">A gente fica aceso até as 23h para salvar as noites de Chácara Anhanguera.</p></div></div>
      </section>

      <section id="menu" className="bg-[#211229] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="eyebrow">Escolha seu momento</p><h2 className="display mt-3 text-4xl font-bold tracking-tight text-[#fff7df] sm:text-5xl">Vai de <span className="text-[#f9c72b]">qual?</span></h2></div><div className="relative w-full max-w-xs"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a998ae]" size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar no cardápio..." className="w-full rounded-full border border-white/15 bg-[#30203a] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#f9c72b]" data-testid="input-search-menu" /></div></div>
          <div className="hide-scrollbar mb-10 flex gap-2 overflow-x-auto pb-2">{categories.map((cat) => <button key={cat.id} onClick={() => setCategory(cat.id)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${category === cat.id ? 'bg-[#f9c72b] text-[#25102e]' : 'border border-white/10 bg-[#2a1835] text-[#c9b9ce] hover:border-[#f9c72b]/60 hover:text-[#f9c72b]'}`} data-testid={`button-category-${cat.id}`}>{cat.label}</button>)}</div>
          <div className="mb-6 flex items-center justify-between"><p className="text-sm text-[#bbaabd]">{filtered.length} opções para pedir agora</p><button onClick={() => setCartOpen(true)} className="flex items-center gap-2 text-sm font-bold text-[#f9c72b] md:hidden" data-testid="button-mobile-cart">Carrinho <ShoppingBag size={15} /></button></div>
          {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} />)}</div> : <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center"><Search className="mx-auto mb-4 text-[#f9c72b]" size={32} /><h3 className="display text-xl font-bold">Nada por aqui ainda</h3><p className="mt-2 text-sm text-[#bbaabd]">Tente outro sabor ou categoria.</p></div>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">Também tem Pont</p><h2 className="display mt-3 text-3xl font-bold text-[#fff7df]">A fome não escolhe <span className="text-[#ed4f98]">formato.</span></h2></div><p className="hidden max-w-xs text-right text-sm leading-relaxed text-[#ad9aac] sm:block">Pizza, burger e dog para ninguém ficar só olhando o pote alheio.</p></div><div className="grid gap-4 md:grid-cols-4"><button onClick={() => {setCategory('pizza'); scrollMenu();}} className="group relative h-52 overflow-hidden rounded-2xl text-left md:col-span-2" data-testid="button-highlight-pizza"><img src={pizzaTraditional} alt="Cardápio de pizzas" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#1a1022] via-transparent" /><span className="absolute bottom-4 left-5 display text-2xl font-bold">Pizzaria Pont <ChevronRight className="inline text-[#f9c72b]" /></span></button><button onClick={() => {setCategory('burger'); scrollMenu();}} className="group relative h-52 overflow-hidden rounded-2xl text-left" data-testid="button-highlight-burger"><img src={burgerMenu} alt="Cardápio de burgers e porções" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#1a1022] via-transparent" /><span className="absolute bottom-4 left-5 display text-xl font-bold">Burger & porções</span></button><button onClick={() => {setCategory('hotdog'); scrollMenu();}} className="group relative h-52 overflow-hidden rounded-2xl text-left" data-testid="button-highlight-hotdog"><img src={hotdogMenu} alt="Cardápio de hot dogs" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#1a1022] via-transparent" /><span className="absolute bottom-4 left-5 display text-xl font-bold">Hot dog sem freio</span></button></div></section>

      <section id="visite" className="border-t border-white/10 bg-[#24132d]"><div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2"><div className="p-8 lg:p-16"><p className="eyebrow">Passa aqui</p><h2 className="display mt-4 text-4xl font-bold leading-tight text-[#fff7df]">A gente fica<br /><span className="text-[#f9c72b]">na esquina.</span></h2><div className="mt-8 space-y-5 text-sm"><p className="flex items-start gap-3 text-[#d7c6d8]"><MapPin className="mt-0.5 shrink-0 text-[#f9c72b]" size={19} /><span>Rua Caetes Quadra 2 Lote 19<br />Chácara Anhanguera, Valparaíso de Goiás - GO<br />72871-635</span></p><p className="flex items-center gap-3 text-[#d7c6d8]"><Clock3 className="text-[#f9c72b]" size={19} /><span>Aberto todos os dias até 23:00</span></p><p className="flex items-center gap-3 text-[#d7c6d8]"><Phone className="text-[#f9c72b]" size={19} /><span>(61) 99137-5677</span></p></div><a href="https://www.google.com/maps/search/?api=1&query=Rua+Caetes+Quadra+2+Lote+19+Valparaiso+de+Goias" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#f9c72b]/50 px-5 py-3 text-sm font-bold text-[#f9c72b] transition hover:bg-[#f9c72b] hover:text-[#25102e]" data-testid="link-maps">Abrir no mapa <ArrowRight size={16} /></a></div><div className="min-h-[330px] overflow-hidden"><img src={storefront} alt="Fachada da Pont Açaí Pizzaria" className="h-full w-full object-cover opacity-80 grayscale-[20%]" /></div></div></section>
    </main>

    <footer className="border-t border-white/10 bg-[#170d1d]"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><div className="display text-xl font-bold">Pont <span className="text-[#f9c72b]">Açaí</span></div><p className="mt-1 text-xs text-[#927e96]">A melhor açaí da cidade. E a pizza também.</p></div><div className="flex items-center gap-5 text-xs text-[#ad9aac]"><span className="flex items-center gap-1.5"><Star size={14} fill="#f9c72b" className="text-[#f9c72b]" /> Google 4,7</span><a href="https://www.instagram.com/Pont_acaii" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#f9c72b]" data-testid="link-footer-instagram"><Instagram size={14} /> @Pont_acaii</a></div></div></footer>

    {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0d0711]/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label={`Adicionar ${selected.name}`}><div className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-white/15 bg-[#2b1738] p-6 shadow-2xl sm:rounded-[2rem]"><div className="flex items-start justify-between"><div><p className="eyebrow">Personalize seu pedido</p><h2 className="display mt-2 pr-5 text-2xl font-bold text-[#fff7df]">{selected.name}</h2></div><button onClick={() => setSelected(null)} className="rounded-full bg-white/10 p-2 text-[#fff7df] hover:bg-white/20" aria-label="Fechar" data-testid="button-close-product"><X size={18} /></button></div><div className="mt-5 overflow-hidden rounded-2xl"><img src={imageFor(selected)} alt="" className="h-36 w-full object-cover object-center opacity-80" /></div><p className="mt-4 text-sm leading-relaxed text-[#cbb9cf]">{selected.description}</p>{(selected.category === 'acai' || selected.category === 'cupuaçu') && <div className="mt-6"><p className="mb-3 text-sm font-bold text-[#fff7df]">Quer turbinar? <span className="font-normal text-[#a997ad]">opcional</span></p><div className="grid grid-cols-2 gap-2">{extras.map((extra) => { const checked = selectedExtras.some((e) => e.name === extra.name); return <button key={extra.name} onClick={() => setSelectedExtras((curr) => checked ? curr.filter((e) => e.name !== extra.name) : [...curr, extra])} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs transition ${checked ? 'border-[#f9c72b] bg-[#f9c72b]/15 text-[#f9c72b]' : 'border-white/10 text-[#cbb9cf] hover:border-white/30'}`} data-testid={`button-extra-${extra.name.toLowerCase().replaceAll(' ','-')}`}><span>{extra.name}</span><b>+{money(extra.price).replace('R$ ','R$ ')}</b></button>; })}</div></div>}{selected.needsNotes && <div className="mt-6"><label className="mb-2 block text-sm font-bold text-[#fff7df]" htmlFor="product-notes">Sabores do combo <span className="font-normal text-[#f9c72b]">obrigatório</span></label><textarea id="product-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex.: 1 Oreo com Nutella, 2 Açaí Puro..." rows={3} className="w-full resize-none rounded-xl border border-white/15 bg-[#1f1129] p-3 text-sm text-white outline-none focus:border-[#f9c72b]" data-testid="textarea-product-notes" /></div>}<div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5"><div className="flex items-center gap-3 rounded-full border border-white/15 p-1"><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="rounded-full p-2 hover:bg-white/10" aria-label="Diminuir quantidade" data-testid="button-decrease-quantity"><Minus size={15} /></button><b className="w-5 text-center">{quantity}</b><button onClick={() => setQuantity((q) => q + 1)} className="rounded-full p-2 hover:bg-white/10" aria-label="Aumentar quantidade" data-testid="button-increase-quantity"><Plus size={15} /></button></div><button onClick={addToCart} disabled={Boolean(selected.needsNotes && !notes.trim())} className="flex items-center gap-3 rounded-full bg-[#f9c72b] px-5 py-3 font-bold text-[#25102e] transition hover:bg-[#ffe17a] disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-confirm-add">Adicionar <span>{money((selected.price + selectedExtras.reduce((s,e) => s+e.price,0)) * quantity)}</span></button></div></div></div>}

    {cartOpen && <div className="fixed inset-0 z-40 bg-[#0d0711]/70 backdrop-blur-sm" onClick={() => setCartOpen(false)}><aside onClick={(e) => e.stopPropagation()} className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/15 bg-[#24132d] shadow-2xl" aria-label="Seu pedido"><div className="flex items-center justify-between border-b border-white/10 p-6"><div><p className="eyebrow">Seu pedido</p><h2 className="display mt-1 text-2xl font-bold">A mesa está posta.</h2></div><button onClick={() => setCartOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Fechar carrinho" data-testid="button-close-cart"><X size={18} /></button></div><div className="flex-1 overflow-y-auto p-5">{cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={42} className="mb-4 text-[#f9c72b]" /><h3 className="display text-xl font-bold">Seu pedido está vazio</h3><p className="mt-2 max-w-xs text-sm text-[#ad9aac]">Escolha um açaí carregado ou um lanche para começar seu pedido.</p><button onClick={() => {setCartOpen(false); scrollMenu();}} className="mt-6 rounded-full bg-[#f9c72b] px-5 py-3 text-sm font-bold text-[#25102e]" data-testid="button-empty-see-menu">Explorar cardápio</button></div> : <div className="space-y-4">{cart.map((item) => <div key={item.key} className="rounded-2xl border border-white/10 bg-[#2c1838] p-4" data-testid={`row-cart-${item.product.id}`}><div className="flex justify-between gap-3"><div><h3 className="display text-sm font-bold">{item.product.name}</h3>{item.extras.length > 0 && <p className="mt-1 text-[11px] text-[#b8a3bb]">+ {item.extras.map((e) => e.name).join(', ')}</p>}{item.notes && <p className="mt-1 text-[11px] text-[#f9c72b]">Obs: {item.notes}</p>}</div><button onClick={() => setCart((curr) => curr.filter((i) => i.key !== item.key))} className="h-fit text-[#a997ad] hover:text-[#ed4f98]" aria-label={`Remover ${item.product.name}`} data-testid={`button-remove-${item.product.id}`}><Trash2 size={16} /></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-full border border-white/10 px-1 py-1"><button onClick={() => changeLine(item.key, -1)} className="rounded-full p-1.5 hover:bg-white/10" aria-label="Diminuir item" data-testid={`button-cart-decrease-${item.product.id}`}><Minus size={12} /></button><b className="w-5 text-center text-xs">{item.quantity}</b><button onClick={() => changeLine(item.key, 1)} className="rounded-full p-1.5 hover:bg-white/10" aria-label="Aumentar item" data-testid={`button-cart-increase-${item.product.id}`}><Plus size={12} /></button></div><b className="text-[#f9c72b]">{money((item.product.price + item.extras.reduce((s,e) => s+e.price,0)) * item.quantity)}</b></div></div>)}</div>}</div>{cart.length > 0 && <div className="border-t border-white/10 bg-[#1f1129] p-5"><div className="mb-2 flex justify-between text-sm text-[#ad9aac]"><span>Subtotal</span><b className="text-[#fff7df]">{money(subtotal)}</b></div><div className="mb-4 flex justify-between"><span className="text-base font-bold">Total do pedido</span><b className="display text-2xl text-[#f9c72b]">{money(subtotal)}</b></div><button onClick={sendWhatsApp} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#30c66b] py-3.5 font-bold text-[#07180d] transition hover:bg-[#55dc87]" data-testid="button-send-whatsapp"><MessageCircle size={18} /> Pedir pelo WhatsApp</button><p className="mt-3 text-center text-[11px] text-[#8f7b95]">Você vai conferir tudo antes de enviar.</p></div>}</aside></div>}
    {toast && <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#f9c72b] px-5 py-3 text-sm font-bold text-[#25102e] shadow-xl" role="status" data-testid="status-cart-toast">{toast}</div>}
    <Toaster />
  </div>;
}

export default App;
