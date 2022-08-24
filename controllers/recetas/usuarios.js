
var config = require('../../dbconfig');
const sql = require('mssql');

async function getUsuarios() {

  try{
    let pool = await sql.connect(config);
    let usuarios = await pool.request().query("select * from usuarios");
    return usuarios.recordsets;
  }
  catch (error) {
     console.log(error);
  }
}


async function getUsuario(email) {
  try {
      let pool = await sql.connect(config);
      let usuarios = await pool.request()
          .input('correo', sql.VarChar, email)
          .query("select  "
                +"   u.id_usuario, "
                + "  u.nombre, "
                + "  u.apellidos, "
                + "  u.email, "
                + "  u.sucursal, "
                + "  CASE " 
                + "    WHEN u.sucursal = 'OBREGÓN' THEN 'SONORA'  " 
                + "    WHEN u.sucursal = 'CONSTITUCIÓN' THEN 'BCS'  "
                + "    WHEN u.sucursal = 'MATRIZ' THEN 'MATRIZ'  "
                + "    ELSE u.sucursal  "
                + "  END as zona, "
                + "  isnull(u.firma,'NO') as firma , "
                + "  u2.id_usuario as id_supervisor, "
                + "  u2.nombre + ' ' + u2.apellidos as nombre_supervisor, "
                + "  u2.email as email_supervisor, "
                + "  stuff( (SELECT ',' + r.descripcion "
                + "            FROM roles r, usuarios_roles ur "
                + "             WHERE ur.id_usuario  = u.id_usuario "
                + "               AND r.id_rol       = ur.id_rol "
                + "             ORDER BY r.id_rol  "
                + "            FOR XML PATH(''), TYPE).value('.', 'varchar(max)') "
                + "         ,1,1,'') as roles "
                + "from  "
                + "  usuarios u  "
                + "  left join usuarios_supervisor us on u.id_usuario = us.id_usuario and us.titular    = 'T' "
                + "  left join usuarios u2  on u2.id_usuario = us.supervisor "
                + "where u.baja   = 0 " 
                + "  and u.email  like @correo");
      return usuarios.recordsets;
  }
  catch (error) {
      console.log(error);
  }
}


module.exports = {
  getUsuarios,
  getUsuario
}