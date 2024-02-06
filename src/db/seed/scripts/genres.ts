import { Entities } from "../../schema/index";
import pc from "picocolors";
const generosLibros = [
    {
        name: "Ficción"},
    {
        name: "No ficción"},
    {
        name: "Misterio"},
    {
        name: "Ciencia ficción"},
    {
        name: "Fantasía"},
    {
        name: "Romance"},
    {
        name: "Aventura"},
    {
        name: "Histórico"},
    {
        name: "Poesía"},
    {
        name: "Autoayuda"
    }
  ];
  
  export const fillGenres = async () => {
    try {
        await Entities.Genre.bulkCreate(generosLibros)
    } catch (error) {
        console.error(pc.red('ocurrio un error al insertar generos'))
    }
  }

  