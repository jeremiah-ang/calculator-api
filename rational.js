class Rational {
    constructor(q, d) {
        if (d === 0) throw 'Divide By Zero';
        var g = Rational.gcd(q, d);
        this.q = q / g;
        this.d = d / g;
        this.reduce_to_simplest();
    }
    /*
    =================================================
                Getter & Setter
    =================================================
    */
    get_quotient() {
        return this.q;
    }
    get_denominator() {
        return this.d;
    }
    set_quotient(q) {
        this.q = q;
    }
    set_denomiator(d) {
        this.d = d;
    }
    set_value(q, d) {
        this.set_quotient(q);
        this.set_denomiator(d);
    }
    /*
    =================================================
                Arimethic Operations
    =================================================
    */
    reduce_to_simplest() {
        if (this.q == 0) {
            this.d = 1;
        } else if (this.d < 0) {
            this.q = -this.q;
            this.d = -this.d;
        } else {
            var g = Rational.gcd(this.q, this.d);
            this.q = this.q / g;
            this.d = this.d / g;
        }
    }
    toString() {
        return this.d === 1 ? this.q : this.q + '/' + this.d;
    }
    toNumber() {
        return this.get_quotient() / this.get_denominator();
    }
    /*
    =================================================
                Alt constructor
    =================================================
    */
    static string_to_rational(s) {
        s = s.split('/');
        var q = s[0];
        var d = s[1] ? s[1] : 1;
        return new Rational(q, d);
    }
    static make(a, b = 1) {
        return new Rational(a, b);
    }
    static clone(r) {
        return new Rational(r.get_quotient(), r.get_denominator());
    }
    /*
    =================================================
                Arimethic Operations
    =================================================
    */
    static add(r1, r2) {
        var new_q = r1.get_quotient() * r2.get_denominator() + r2.get_quotient() * r1.get_denominator();
        var new_d = r1.get_denominator() * r2.get_denominator();
        return new Rational(new_q, new_d);
    }
    static minus(r1, r2) {
        return Rational.add(r1, this.negate(r2));
    }
    static mul(r1, r2) {
        var new_q = r1.get_quotient() * r2.get_quotient();
        var new_d = r1.get_denominator() * r2.get_denominator();
        return new Rational(new_q, new_d);
    }
    static divide(r1, r2) {
        return Rational.mul(r1, Rational.invert(r2));
    }
    static negate(r) {
        var new_r = Rational.clone(r);
        new_r.set_quotient(-1 * new_r.get_quotient());
        new_r.reduce_to_simplest();
        return new_r;
    }
    static invert(r) {
        var new_r = Rational.clone(r);
        var temp = new_r.get_quotient();
        new_r.set_quotient(new_r.get_denominator());
        new_r.set_denomiator(temp);
        new_r.reduce_to_simplest();
        return new_r;
    }
    static equals(r1, r2) {
        return r1.get_quotient() === r2.get_quotient() && r1.get_denominator() === r2.get_denominator();
    }
    static pow(r1, r2) {
        var new_q = Math.pow(r1.get_quotient(), r2.toNumber());
        var new_d = Math.pow(r1.get_denominator(), r2.toNumber());
        if (Rational.isInteger(new_q) && Rational.isInteger(new_d)) {
            return new Rational(new_q, new_d);
        } else {
            var r = new Rational(1, 1);
            r.q = new_q / new_d;
            return r;
        }
    }
    static gcd(a, b) {
        if (isNaN(a)) return 0;
        a = Math.abs(a);
        b = Math.abs(b);
        if (a === 0 || b === 0) return a + b;
        else return Rational.gcd(b, a % b);
    }
    static isInteger(a) {
        return Math.floor(a) === a;
    }
}

module.exports = Rational;
