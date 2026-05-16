import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  IonHeader, 
  IonToolbar, 
  IonSearchbar, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent, 
  IonFooter, 
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { bagHandleOutline, homeOutline, personOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

interface LiveStream {
  id: number;
  thumbnailUrl: string;
  hostAvatarUrl: string;
  hostName: string;
  title: string;
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonButtons,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonIcon,
    IonContent,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    FormsModule,
    RouterLink,
  ],
})
export class DiscoverPage {
  protected readonly homeOutline = homeOutline;
  protected readonly bagHandleOutline = bagHandleOutline;
  protected readonly personOutline = personOutline;

  private readonly pageSize = 8;
  private currentIndex = 0;

  // Mock data sementara sampai backend API siap.
  private readonly allStreams: LiveStream[] = [
    {
      id: 1,
      thumbnailUrl: 'https://img.youtube.com/vi/J7tekVDdUhg/hqdefault.jpg',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      hostName: 'Glowista Official',
      title: 'Flash Sale Skincare Korea, harga mulai 19K!',
    },
    {
      id: 2,
      thumbnailUrl: 'https://img.youtube.com/vi/IUDITWG5Xuc/hqdefault.jpg',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      hostName: 'UrbanWear Hub',
      title: 'Styling OOTD Gen Z, diskon jaket up to 60%',
    },
    {
      id: 3,
      thumbnailUrl: 'https://i.ibb.co.com/23VMBbZy/IMG-20251028-WA0003.jpg?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
      hostName: 'Chic Closet',
      title: 'Bongkar stok dress premium, cuma malam ini',
    },
    {
      id: 4,
      thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80',
      hostName: 'TimeBox',
      title: 'Unboxing jam tangan keren, deal kilat setiap 5 menit',
    },
    {
      id: 5,
      thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
      hostName: 'DailyFits',
      title: 'Celana cargo best seller balik lagi, rebut sekarang',
    },
    {
      id: 6,
      thumbnailUrl: 'https://i.ibb.co.com/HZQ2yk0/IMG-20231029-WA0013.jpg?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=200&q=80',
      hostName: 'Sneaker Lab',
      title: 'Live legit check dan drop sneakers limited',
    },
    {
      id: 7,
      thumbnailUrl: 'https://i.ibb.co.com/23VMBbZy/IMG-20251028-WA0003.jpg?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80',
      hostName: 'HomeNook',
      title: 'Peralatan rumah estetik, bundle hemat banget',
    },
    {
      id: 8,
      thumbnailUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      hostName: 'SnackVerse',
      title: 'Mukbang + borong snack viral Jepang dan Korea',
    },
    {
      id: 9,
      thumbnailUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=200&q=80',
      hostName: 'Beauty Beam',
      title: 'Makeup class singkat + voucher ongkir free',
    },
    {
      id: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      hostName: 'GameGarage',
      title: 'Setup gaming room impian, harga bundling spesial',
    },
    {
      id: 11,
      thumbnailUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=200&q=80',
      hostName: 'PetLuv Store',
      title: 'Promo kebutuhan anabul, gratis bonus mainan',
    },
    {
      id: 12,
      thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      hostAvatarUrl: 'https://images.unsplash.com/photo-1522556189639-b1508ddf9a9c?auto=format&fit=crop&w=200&q=80',
      hostName: 'Kick Avenue',
      title: 'Sneakers live auction mulai 99K, siap rebutan',
    },
  ];

  streams: LiveStream[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.loadMoreStreams();
  }

  onSearch(): void {
    // Placeholder untuk aksi pencarian.
  }

  onIonInfinite(event: InfiniteScrollCustomEvent): void {
    setTimeout(() => {
      this.loadMoreStreams();
      event.target.complete();
      event.target.disabled = this.currentIndex >= this.allStreams.length;
    }, 450);
  }

  goToLive(streamId: number): void {
    this.router.navigate(['/live-room', streamId]);
  }

  trackByStreamId(_index: number, item: LiveStream): number {
    return item.id;
  }

  private loadMoreStreams(): void {
    const nextChunk = this.allStreams.slice(this.currentIndex, this.currentIndex + this.pageSize);
    this.streams = [...this.streams, ...nextChunk];
    this.currentIndex += nextChunk.length;
  }
}
