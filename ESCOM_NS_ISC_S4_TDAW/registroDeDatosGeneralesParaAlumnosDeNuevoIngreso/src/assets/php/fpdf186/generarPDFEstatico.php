<?php
require('fpdf.php');

class PDF extends FPDF
{
    function Header()
    {
        $this->SetFillColor(51, 122, 183);
        $this->SetTextColor(255);
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(0, 10, 'Datos', 1, 1, 'C', true);
        $this->Ln(10);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Página ' . $this->PageNo(), 0, 0, 'C');
    }

    function ChapterTitle($title)
    {
        $this->SetFont('Arial', 'B', 12);
        $this->SetFillColor(200, 220, 255);
        $this->Cell(0, 10, $title, 1, 1, 'L', true);
    }

    function ChapterBody($body)
    {
        $this->SetFont('Arial', '', 12);
        $this->MultiCell(0, 10, $body);
    }
}

// Crear instancia de la clase PDF
$pdf = new PDF();
$pdf->AddPage();

// Información Personal
$pdf->ChapterTitle('Información Personal');
$pdf->ChapterBody('Nombres: Juan' . "\n" .
                 'Apellido Paterno: Gómez' . "\n" .
                 'Apellido Materno: López' . "\n" .
                 'Fecha de Nacimiento: 01/01/1990' . "\n" .
                 'Género: Masculino' . "\n" .
                 'CURP: XXXX123456XXXX');

// Contacto
$pdf->ChapterTitle('Contacto');
$pdf->ChapterBody('Calle y Numero: Calle 123' . "\n" .
                 'Colonia: Colonia Ejemplo' . "\n" .
                 'Alcaldía: Alcaldía Ejemplo' . "\n" .
                 'Código Postal: 12345' . "\n" .
                 'Teléfono o Celular: 555-123-4567');

// Procedencia
$pdf->ChapterTitle('Procedencia');
$pdf->ChapterBody('Escuela: Escuela XYZ' . "\n" .
                 'Entidad Federativa: Estado Ejemplo' . "\n" .
                 'Promedio: 9.5' . "\n" .
                 'Opción: Opción 1');

// Salud
$pdf->ChapterTitle('Salud');
$pdf->ChapterBody('Condición de Salud: Buena salud');

// Sesion
$pdf->ChapterTitle('Sesión');
$pdf->ChapterBody('Correo Electrónico: john.doe@example.com' . "\n" .
                 'Contraseña: ********');

// Nuevas secciones
$pdf->ChapterTitle('Nombre de Grupo');
$pdf->ChapterBody('Grupo A');

$pdf->ChapterTitle('Horario de Inicio');
$pdf->ChapterBody('10:00 AM');

$pdf->ChapterTitle('Laboratorio');
$pdf->ChapterBody('Laboratorio 101');

// Salida del PDF
$pdf->Output();
?>
