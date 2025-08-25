"use client";
import "./button_slide.css";
import "./cartScrollbarHide.css";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Niche ke imports apne project ke hisaab se adjust karen
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram } from "lucide-react";
import BagIcon from "./BagIcon";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const navItems = [
	{ label: "Features", path: "#", scrollId: "before-after" },
	{ label: "Products", path: "/products" },
	{ label: "Reviews", path: "#", scrollId: "reviews" },
];


const Navbar: React.FC = () => {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);
	const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
	const [showCard, setShowCard] = useState(false);
	const [checkoutDirection, setCheckoutDirection] = useState('slide_right');
	const { cart, removeFromCart, updateQuantity, cartVersion } = useCart();
	// Re-render when cartVersion changes (cart cleared)
	useEffect(() => {}, [cartVersion]);

	// Close cart when clicking outside
	useEffect(() => {
		if (!showCard) return;
		function handleClick(e: MouseEvent) {
			const cartSlider = document.querySelector('.cart-slider-area');
			if (cartSlider && !cartSlider.contains(e.target as Node)) {
				setShowCard(false);
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [showCard]);

	// Force re-render of cart sidebar when cartVersion changes
	useEffect(() => {
		if (showCard) {
			setShowCard(false);
			setTimeout(() => setShowCard(true), 50);
		}
	}, [cartVersion]);
	// Removed duplicate declarations

	useEffect(() => {
		if (pendingScrollId && window.location.pathname === '/') {
			setTimeout(() => {
				const el = document.getElementById(pendingScrollId);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
				setPendingScrollId(null);
			}, 400);
		}
	}, [pendingScrollId]);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, scrollId?: string) => {
		if (scrollId) {
			e.preventDefault();
			if (window.location.pathname === '/') {
				const el = document.getElementById(scrollId);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			} else {
				setPendingScrollId(scrollId);
				router.push('/');
			}
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);


		return (
			<>
				<nav
					className={`w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] z-50 px-10 flex items-center transition-all duration-300 border-b border-white/10 ${
						scrolled ? "backdrop-blur-sm" : "backdrop-blur"
					}`}
				>
					{/* Logo with click handler for desktop only */}
					<div className="h-auto w-auto flex flex-row items-center group cursor-pointer select-none hidden md:flex" onClick={() => setShowCard(true)}>
						<Logo />
					</div>
					{/* Mobile: keep as link */}
					<Link href="/" className="h-auto w-auto flex flex-row items-center group md:hidden">
						<Logo />
					</Link>
					<div className="flex-1 flex justify-center">
						<div className="flex items-center justify-center w-[420px] h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200 gap-16 -ml-32">
							{navItems.map((item) => (
								<a
									key={item.label}
									href={item.path}
									className="cursor-pointer text-lg font-medium transition-colors duration-200 hover:text-purple-400"
									onClick={e => handleNavClick(e, item.path, item.scrollId)}
								>
									{item.label}
								</a>
							))}
						</div>
					</div>
					<div className="flex items-center space-x-3 ml-auto z-10">
						<a
							href="https://www.instagram.com/vroom_visionsx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-purple-400 transition-colors"
						>
							<Instagram size={25} />
						</a>
						<Button
							variant="ghost"
							className="relative group text-white px-3 py-1 rounded-full bg-transparent hover:bg-transparent focus:bg-transparent"
							onClick={() => setShowCard(true)}
						>
							<span className="inline-block">
								<BagIcon width={26} height={26} color="white" className="bagicon-navbar" />
							</span>
							<style>{`
								.group:hover .bagicon-navbar rect,
								.group:hover .bagicon-navbar path {
									stroke: #7042f8;
								}
							`}</style>
							{cart.length > 0 && (
								<span className="absolute -top-1 -right-1 flex items-center justify-center" style={{background: '#7042f8', color: 'white', fontSize: '0.65rem', width: '18px', height: '18px', borderRadius: '50%'}}>
									{cart.length}
								</span>
							)}
						</Button>
					</div>
				</nav>

				{/* Slide-in card section (desktop only) */}
				<AnimatePresence>
					{showCard && (
						<motion.div
							initial={{ x: 400, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 400, opacity: 0 }}
							transition={{ type: "spring", stiffness: 400, damping: 40 }}
							className="fixed top-0 right-0 h-full w-[420px] bg-[#1a1333] shadow-2xl z-[100] border-l border-white/10 rounded-l-2xl p-6 hidden md:block cart-slider-area"
						>
							<div className="flex justify-between items-center mb-2">
								<span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-geist-mono), Geist Mono, monospace', letterSpacing: '0.04em' }}>Cart</span>
								<button className="text-white hover:text-purple-400 text-2xl" onClick={() => setShowCard(false)}>&times;</button>
							</div>
							<div className="flex items-center justify-center mb-6">
								<motion.div
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 0.5, ease: 'easeOut' }}
									style={{ originX: 0.5 }}
									className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 opacity-80 rounded-full"
								/>
							</div>
											{/* Cart content: show empty message if cart is empty */}
											{cart.length === 0 ? (
												<div className="flex flex-col items-center justify-center h-[60vh] mt-32 w-full">
													<span className="text-white/70 text-lg font-semibold" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>YOUR CART IS EMPTY</span>
												</div>
											) : (
												<>
													<div className="cart-slider-area flex flex-col gap-8 mt-8 overflow-y-auto" style={{maxHeight: 'calc(100vh - 240px)', paddingBottom: '90px'}}>
														{cart.map(item => (
															<React.Fragment key={item.product.id}>
																<div className="flex flex-row items-center gap-6 px-2">
																	<Image src={item.product.imageUrl[0]} alt={item.product.name} width={112} height={128} className="w-28 h-32 object-cover rounded-lg shadow" />
																	<div className="flex-1 flex flex-col justify-center">
																		<span className="font-semibold text-base text-white mb-1" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>{item.product.name}</span>
																		<span className="text-sm text-gray-500 mb-2">RS. {(item.product.price).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
																		<div className="flex items-center gap-2 mt-2">
																			<div className="grid grid-cols-3 items-center justify-center rounded border border-purple-500 bg-transparent overflow-hidden w-[90px]">
																				<button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="h-8 w-full text-base text-white bg-transparent flex items-center justify-center">-</button>
																				<span className="h-8 w-full text-base font-medium text-white select-none bg-transparent flex items-center justify-center" style={{position: 'relative', overflow: 'hidden'}}>
																					<AnimatePresence initial={false} mode="wait">
																						<motion.span
																							key={item.quantity}
																							initial={{ y: 32, opacity: 0 }}
																							animate={{ y: 0, opacity: 1 }}
																							exit={{ y: -32, opacity: 0 }}
																							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
																							style={{ position: 'absolute', left: 0, right: 0, width: '100%', textAlign: 'center' }}
																						>
																							{item.quantity}
																						</motion.span>
																					</AnimatePresence>
																				</span>
																				<button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-8 w-full text-base text-white bg-transparent flex items-center justify-center">+</button>
																			</div>
																			<button onClick={() => removeFromCart(item.product.id)} className="ml-4 text-sm text-gray-700 underline hover:text-purple-500">Remove</button>
																		</div>
																	</div>
																</div>
																<div className="w-full flex items-center justify-center mt-4" style={{background: '#1a1333', borderRadius: '12px', padding: '6px 0'}}>
																	<motion.div
																		initial={{ scaleX: 0 }}
																		animate={{ scaleX: 1 }}
																		transition={{ duration: 0.5, ease: 'easeOut' }}
																		style={{ originX: 0.5 }}
																		className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 opacity-80 rounded-full"
																	/>
																</div>
															</React.Fragment>
														))}
													</div>
													{/* Fixed bottom section for order note and checkout */}
													<div className="w-full absolute left-0 bottom-0 pb-4 px-6 flex flex-col items-center" style={{background: '#1a1333'}}>
														<div className="w-full" style={{borderRadius: '24px', padding: '4px 8px', marginBottom: '0', marginTop: '10px'}}>
															<span className="block text-white text-base font-semibold mb-1" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>Add order note</span>
															<span className="block text-gray-400 text-sm font-normal" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>Taxes and shipping calculated at checkout</span>
														</div>
														<div className="flex justify-center w-full min-w-0" style={{borderRadius: '12px', padding: '10px'}}>
															<button
																className={`w-[80px] min-w-0 overflow-hidden flex items-center justify-between button_slide ${checkoutDirection} p-2 text-xs`}
																onMouseEnter={e => {
																	const rect = e.currentTarget.getBoundingClientRect();
																	const x = e.nativeEvent.clientX;
																	setCheckoutDirection(x - rect.left < rect.width / 2 ? 'slide_right' : 'slide_left');
																}}
																onMouseLeave={() => setCheckoutDirection('slide_right')}
																onClick={() => router.push('/checkout')}
															>
																<span className="tracking-wide">Checkout</span>
																<span className="mx-1 text-xs font-mono font-semibold">•</span>
																<span className="tracking-wide">{cart.length > 0 ? cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString('en-IN', {maximumFractionDigits: 0}) : '0'}</span>
															</button>
														</div>
													</div>
												</>
											)}
						</motion.div>
					)}
				</AnimatePresence>
			</>
	);
}

export default Navbar;
