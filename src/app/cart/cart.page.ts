import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonList, IonItemSliding, IonItem, IonItemOptions,
  IonItemOption, IonIcon, IonButton, IonBadge, IonLabel,
  IonThumbnail, IonFooter, IonRippleEffect,
  AlertController, AnimationController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trashOutline, addCircleOutline, removeCircleOutline,
  cartOutline, bagHandleOutline, chevronForwardOutline,
  storefrontOutline, checkmarkCircleOutline
} from 'ionicons/icons';

export interface CartItem {
  id: number;
  name: string;
  shopName: string;
  price: number;
  qty: number;
  image: string;
  variant: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItemSliding, IonItem, IonItemOptions,
    IonItemOption, IonIcon, IonButton, IonBadge, IonLabel,
    IonThumbnail, IonFooter, IonRippleEffect,
  ],
})
export class CartPage implements OnInit {

  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Wafer Tango',
      shopName: 'Warung Madura Abadi',
      price: 25000,
      qty: 1,
      image: 'https://i.ibb.co.com/N6wrXNRx/OIP.webp',
      variant: 'Putih / 42',
    },
    {
      id: 2,
      name: 'Kaos Oversize Premium Cotton',
      shopName: 'UrbanThreads Store',
      price: 185000,
      qty: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
      variant: 'Hitam / XL',
    },
    {
      id: 3,
      name: 'Tas Selempang Kulit Sintetis',
      shopName: 'BagCraft Jakarta',
      price: 325000,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80',
      variant: 'Coklat Muda',
    },
    {
      id: 4,
      name: 'Jam Tangan Analog Minimalis',
      shopName: 'TimeZone Store',
      price: 899000,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
      variant: 'Silver / Hitam',
    },
  ];

  constructor(
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    addIcons({
      trashOutline, addCircleOutline, removeCircleOutline,
      cartOutline, bagHandleOutline, chevronForwardOutline,
      storefrontOutline, checkmarkCircleOutline
    });
  }

  ngOnInit() {}

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.qty, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  incrementQty(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.qty++;
    }
  }

  decrementQty(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      if (item.qty > 1) {
        item.qty--;
      } else {
        this.confirmRemove(id);
      }
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

  async confirmRemove(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    const alert = await this.alertController.create({
      header: 'Hapus Produk?',
      message: `Apakah kamu yakin ingin menghapus ${item?.name} dari keranjang?`,
      cssClass: 'cart-alert',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => this.removeItem(id),
        },
      ],
    });
    await alert.present();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  }

  async onCheckout() {
    const alert = await this.alertController.create({
      header: '🎉 Pesanan Dikonfirmasi!',
      message: `Total pembayaran: <strong>${this.formatPrice(this.getTotalPrice())}</strong>.<br><br>Terima kasih telah berbelanja!`,
      cssClass: 'cart-alert',
      buttons: ['OK'],
    });
    await alert.present();
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}