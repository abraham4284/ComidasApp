import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';

import authRoutes from './routes/auth/usuarios.routes.js'
import domiciliosRoutes from './routes/domicilios_routes/domicilios.routes.js'
import formaPagoRoutes from './routes/formaPago_routes/formaPago.routes.js'
import negociosRoutes from './routes/negocios_routes/negocios.routes.js'
import productosRoutes from './routes/productos_routes/productos.routes.js'
import ventasRoutes from './routes/ventas_routes/ventas.routes.js'
import ticketsRoutes from './routes/tickets_routes/tickets.routes.js'

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }));



app.get("/",(req,res)=>{
  res.send("Api funcionando")
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())

app.use("/api",authRoutes)
app.use("/api",domiciliosRoutes)
app.use("/api",formaPagoRoutes)
app.use("/api",negociosRoutes)
app.use("/api",productosRoutes)
app.use("/api",ventasRoutes)
app.use("/api",ticketsRoutes)


export default app;

