import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonToolbar, NavController } from '@ionic/angular/standalone';
import { cartOutline, closeOutline, sendOutline } from 'ionicons/icons';

interface ChatMessage {
  user: string;
  text: string;
  avatar: string;
}

interface LiveProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-live-room',
  templateUrl: './live-room.page.html',
  styleUrls: ['./live-room.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonInput, IonButton, IonIcon],
})
export class LiveRoomPage implements OnInit {
  protected readonly closeOutline = closeOutline;
  protected readonly sendOutline = sendOutline;
  protected readonly cartOutline = cartOutline;

  hostName = 'Pakde Oslo';
  hostAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';

  videoUrl = 'https://www.youtube.com/embed/J7tekVDdUhg';
  safeVideoUrl!: SafeResourceUrl;

  currentProduct: LiveProduct = {
    id: 301,
    name: 'VIVO 12 Promagh',
    price: 2399944,
    image: 'https://i.ibb.co.com/Hf5f7B9V/properti-HP.webp',
  };

  products: LiveProduct[] = [
    {
      id: 301,
      name: 'Serum Bright Glow 30ml',
      price: 79000,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 302,
      name: 'Hydrating Cleanser Foam',
      price: 59000,
      image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 303,
      name: 'Daily Sun Screen SPF50',
      price: 69000,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80',
    },
  ];

  messages: ChatMessage[] = [
    {
      user: 'Ayu',
      text: 'Kak ini cocok untuk kulit sensitif?',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    },
    {
      user: 'Bahlul',
      text: 'Gantenk?',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      user: 'Eko',
      text: 'Busettt mahal amat',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80',
    },
  ];

  draftMessage = '';
  isProductListOpen = false;

  roomId: string | null = null;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.safeVideoUrl = this.sanitizeYoutubeUrl(this.videoUrl);
    this.listenToMessages();
  }

  setVideoSource(urlOrVideoId: string): void {
    const embedUrl = this.resolveYoutubeEmbed(urlOrVideoId);
    this.safeVideoUrl = this.sanitizeYoutubeUrl(embedUrl);
  }

  closeRoom(): void {
    this.navCtrl.back();
  }

  toggleProductList(): void {
    this.isProductListOpen = !this.isProductListOpen;
  }

  buyNow(product: LiveProduct): void {
    // TODO: hubungkan ke checkout API.
    void product;
  }

  sendMessage(): void {
    const text = this.draftMessage.trim();
    if (!text) {
      return;
    }

    this.messages = [
      ...this.messages,
      {
        user: 'Saya',
        text,
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=120&q=80',
      },
    ];

    this.draftMessage = '';

    // TODO (Firebase): simpan pesan ke firestore/realtime database.
    // this.chatService.sendMessage(this.roomId, payload);
  }

  listenToMessages(): void {
    // TODO (Firebase): subscribe realtime message updates.
    // this.chatService.listenToMessages(this.roomId).subscribe((messages) => {
    //   this.messages = messages;
    // });
  }

  trackByProductId(_index: number, product: LiveProduct): number {
    return product.id;
  }

  trackByMessageIndex(index: number): number {
    return index;
  }

  private sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private resolveYoutubeEmbed(urlOrVideoId: string): string {
    if (urlOrVideoId.includes('youtube.com/embed/')) {
      return urlOrVideoId;
    }

    if (urlOrVideoId.includes('watch?v=')) {
      const parts = urlOrVideoId.split('watch?v=');
      const videoId = parts[1]?.split('&')[0] ?? '';
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (urlOrVideoId.includes('youtu.be/')) {
      const videoId = urlOrVideoId.split('youtu.be/')[1]?.split('?')[0] ?? '';
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return `https://www.youtube.com/embed/${urlOrVideoId}`;
  }
}
