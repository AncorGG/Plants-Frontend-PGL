import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../services/plants.service';
import { ModalController } from '@ionic/angular';
import { AddPlantModalComponent } from '../plant-modal/plant-modal.component';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.page.html',
  styleUrls: ['./my-plants.page.scss'],
})
export class MyPlantsPage implements OnInit {
  plants: any = [];
  expandedPlantId: number | null = null;
  plantToDelete: any;
  plantNameFilter: string = '';
  plantAgeFilter: number | null = null;
  searchBy: 'name' | 'age' = 'name';
  searchInput: string | number = '';
  sortBy: string = 'plantName';
  sortOrder: string = 'asc';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deletePlant(this.plantToDelete);
      },
    },
  ];

  constructor(
    private plantService: PlantsService,
    private modalCtrl: ModalController
  ) {}

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  ngOnInit() {
    this.getAllPlants();
  }

  getAllPlants() {
    this.applyFilters();
  }

  applyFilters() {
    const filterParams: any = {
      plantName: this.searchBy === 'name' ? this.searchInput : undefined,
      plantAge: this.searchBy === 'age' ? this.searchInput : undefined,
      sort: `${this.sortBy},${this.sortOrder}`,
    };

    this.plantService.getPlants(filterParams).subscribe(
      (response: any) => {
        this.plants = response.content;
      },
      (error) => {
        console.error('Error fetching plants:', error);
      }
    );
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  toggleSortBy() {
    this.sortBy = this.sortBy === 'plantName' ? 'plantAge' : 'plantName';
    this.applyFilters();
  }

  toggleOptions(plantId: number) {
    this.expandedPlantId = this.expandedPlantId === plantId ? null : plantId;
  }

  async configurePlant(plant: any) {
    const modal = await this.modalCtrl.create({
      component: AddPlantModalComponent,
      componentProps: {
        plant: plant,
      },
    });
    await modal.present();

    await modal.onWillDismiss();
    this.getAllPlants();
  }

  presentAlert(plant: any) {
    this.plantToDelete = plant;
    document.querySelector('ion-alert')?.present();
  }

  deletePlant(plant: any) {
    this.plantService.deletePlant(plant.idplant).subscribe(
      (response) => {
        console.log('Plant deleted successfully:', response.message);
        this.plants = this.plants.filter(
          (p: any) => p.idplant !== plant.idplant
        );
      },
      (error) => {
        console.error('Error deleting plant:', error);
      }
    );
  }

  async openAddPlantModal() {
    const modal = await this.modalCtrl.create({
      component: AddPlantModalComponent,
    });
    modal.onDidDismiss().then(() => {
      this.getAllPlants();
    });
    return await modal.present();
  }

  addPlant() {}
}
