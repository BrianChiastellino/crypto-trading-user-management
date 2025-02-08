# Sistema de Trading y Gestión de Usuarios

## Descripción

Este proyecto es un **sistema de trading y gestión de usuarios** desarrollado con **Angular**, diseñado para ofrecer una experiencia intuitiva y segura para los usuarios. Permite:

- **Registro y autenticación de usuarios**.
- **Gestión de billeteras virtuales**: cargar saldo, retirarlo, comprar y vender criptomonedas.
- **Acceso en tiempo real** a la información de precios de criptomonedas mediante la API de **CoinGecko**.

El sistema también cuenta con un **panel de administración**, donde un administrador puede:

- **Visualizar y gestionar usuarios**.
- **Monitorear billeteras y movimientos** (compras, ventas, depósitos y retiros).
- **Mantener el control del sistema**, asegurando su correcto funcionamiento.

## Tecnologías utilizadas

### **Frontend**

- **Angular** con **Angular Material** para la interfaz de usuario.
- **RxJS y BehaviorSubject** para gestión de estados y datos en tiempo real.

### **Backend**

Este proyecto consume la API pública de **CoinGecko** para obtener información actualizada sobre criptomonedas.

## Funcionalidades principales

### **Autenticación y Seguridad**

- **Autenticación segura** mediante un sistema basado en cookies.
- **Protección de rutas** en el frontend con **guards**.
- **Gestión de sesión** con BehaviorSubject para manejar el estado del usuario.

### **Gestión de Usuarios y Billeteras**

- Creación, edición y eliminación de usuarios.
- Registro de movimientos dentro de las billeteras.
- Administración centralizada para mejorar la supervisión del sistema.

## API CoinGecko

Para obtener el valor actualizado de las criptomonedas, utilizamos la **API de CoinGecko**, que proporciona información de hasta **100 criptomonedas** en su versión gratuita. Puedes consultar más detalles en su documentación oficial: [CoinGecko API](https://www.coingecko.com/es/api).

## Objetivo del Proyecto

Este desarrollo busca demostrar **habilidades en Angular y consumo de APIs externas**, aplicando **buenas prácticas en la gestión de datos y seguridad.**

