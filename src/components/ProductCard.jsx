

// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { money } from "../lib/format";

const Card = styled.div`
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 1rem;
  padding: .75rem;
  transition: transform .12s ease, box-shadow .12s ease;
  background: #fff;
  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.08); }
  @media (min-width: 768px) { padding: 1rem; }
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: .75rem;
  background: rgba(0,0,0,.05);
`;

const Title = styled.h6`
  margin: .5rem 0 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-top: .25rem;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export default function ProductCard({ p, onAdd }) {
  return (
    <Card>
      <Link to={`/product/${p.id}`} className="text-decoration-none text-reset">
        <Img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onError={(e)=>{e.currentTarget.src="/placeholder.jpg"}}
        />
        <Title>{p.title}</Title>
      </Link>

      <Footer>
        <strong className="fs-6">{money(Number(p.price) || 0)}</strong>
        <button
          className="btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-1 w-100 w-sm-auto"
          onClick={() => onAdd(p)}
        >
          <AiOutlineShoppingCart /> Agregar
        </button>
      </Footer>
    </Card>
  );
}
