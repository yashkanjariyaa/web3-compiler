fn safe_add(a: i64, b: i64) -> Result<i64, &'static str> {
    a.checked_add(b).ok_or("Addition overflow/underflow")
}

fn main() {
    // Example usage
    match safe_add(5, 3) {
        Ok(result) => println!("Sum: {}", result)
        Err(err) => println!("Error: {}", err)
    }
}