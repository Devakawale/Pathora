import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
export default function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label={`${brand.name} home`}>
    <span className="brand-mark">{brand.logo}</span><span className="brand-word">{brand.name}</span>
  </Link>
}