import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

//import { Recipe } from '../../recipe.model';
//import { RecipeService } from '../../recipe.service';
import { Library } from '../../svcs/library.model';
import { LibraryService } from '../../svcs/library.service';

@Component({
  templateUrl: 'library.component.html'
})
export class LibraryComponent implements OnInit {

  public libraryContent: Library[];
  showLibraryItems: boolean = true;
  showItemDetails: boolean = false;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.getLibraryContent();
  }

  getLibraryContent(){
    this.libraryService
    .getLibraryContent()
    .subscribe((data: Library[]) => {
      this.libraryContent = data;
      console.log('Data requested ... ');
      console.log(this.libraryContent);
    });
  }

  selectedRecipeCode = "some code"

  selectedRecipe: any = {};
  rec: Library;

  displayLibrary() {
    this.showLibraryItems = true;
    this.showItemDetails = false;
  }

  // displayItem(id) {
  //   this.showLibraryItems = false;
  //   this.showItemDetails = true;
  //   console.log('Clicked item ' + id);
  //   this.recipeService.getRecipeById(id).subscribe(res => {
  //     this.selectedRecipe = res;
  //     this.rec = (res as Recipe);
  //     console.log(this.rec.code);
  //     //this.selectedRecipeCode = res.code;
  //   })
  // }
}
