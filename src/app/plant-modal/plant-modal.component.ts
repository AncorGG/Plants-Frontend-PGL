import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlantsService } from '../services/plants.service';

@Component({
  selector: 'app-plant-modal',
  templateUrl: './plant-modal.component.html',
  styleUrls: ['./plant-modal.component.scss'],
})
export class AddPlantModalComponent implements OnInit {
  @Input() plant: any;

  newPlantName: string = '';
  newPlantAge: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    private plantService: PlantsService
  ) {}

  ngOnInit() {
    console.log('Received plant:', this.plant);
    if (this.plant) {
      this.newPlantName = this.plant.plantName || '';
      this.newPlantAge = this.plant.plantAge || null;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  addOrUpdatePlant() {
    if (!this.newPlantName || !this.newPlantAge) {
      console.error('Plant name and age are required!');
      return;
    }

    const plantData = {
      plantName: this.newPlantName,
      plantAge: this.newPlantAge,
    };

    if (this.plant) {
      this.plantService.putPlant(this.plant.idplant, plantData).subscribe(
        (response: any) => {
          console.log('Plant updated successfully:', response);
          this.dismiss();
        },
        (error) => {
          console.error('Error updating plant:', error);
        }
      );
    } else {
      this.plantService.addPlant(plantData).subscribe(
        (response: any) => {
          console.log('Plant added successfully:', response);
          this.dismiss();
        },
        (error) => {
          console.error('Error adding plant:', error);
        }
      );
    }
  }
}
