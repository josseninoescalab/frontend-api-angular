import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
 
@Component({
 selector: 'app-usuario',
 templateUrl: './usuario.component.html',
 styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
 
 displayedColumns = ['id', 'nombre', 'acciones'];
 dataSource: MatTableDataSource<Usuario>;
 @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true}) sort: MatSort;
  constructor(
   private usuarioService: UsuarioService,
   private snackBar: MatSnackBar,
   public route: ActivatedRoute
 ) { }
 
 ngOnInit() {
   this.usuarioService.usuarioCambio.subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   });
 
   this.usuarioService.mensajeCambio.subscribe(data => {
       this.snackBar.open(data, 'AVISO', {
         duration: 2000,
       });
   });
 
   this.obtenerUsuarios();
 }
 
 obtenerUsuarios(){
   this.usuarioService.listar().subscribe((data) => {
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   })
 }
 
}
