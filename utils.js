function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){
    /*
    Ix = Ax+(Bx-Ax)t = Cx+(Dx-Cx)u
    Iy = Ay+(By-Ay)t = Cy+(Dy-Cy)u
    equation using lerp

    For t:
    Ax+(Bx-Ax)t = Cx+(Dx-Cx)u => -Cx
    (Ax-Cx)+(Bx-Ax)t = (Dx - Cx)u

    Ay+(By-Ay)t = Cy+(Dy-Cy)u => -Cy
    (Ay-Cy)+(By-Ay)t = (Dy - Cy)u => *(Dx - Cx)

    (Dx - Cx)(Ay - Cy)+(Dx - Cx)(By-Ay)t = (Dy-Cy)(Dx - Cx)u
    (Dx - Cx)(Ay - Cy)+(Dx - Cx)(By-Ay)t = (Dy-Cy)(Ax-Cx)+(Dy-Cy)(Bx-Ax)t  => -(Dy-Cy)(Ax-Cx)
                                                                           => -(Dx-Cx)(By-Ay)t
    (Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx) = (Dy - Cy)(Bx - Ax)t - (Dx - Cx)(By - Ay)t

    t = ((Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx)) / ((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))

    t = top / bottom => bottom cant be 0

    For u:
    Cx+(Dx-Cx)u = Ax+(Bx-Ax)t  => -Ax
    (Cx - Ax) + (Dx - Cx)u = (Bx - Ax)t

    Cy+(Dy-Cy)u = Ay+(By - Ay)t => -Ay
    (Cy - Ay) + (Dy - Cy)u = (By - Ay)t => *(Bx - Ax)

    (Bx - Ax)(Cy - Ay) + (Bx - Ax)(Dy - Cy)u = (By - Ay)(Bx - Ax)t
    (Bx - Ax)(Cy - Ay) + (Bx - Ax)(Dy - Cy)u = (By - Ay)((Cx - Ax) + (Dx - Cx)u)
    (Bx - Ax)(Cy - Ay) + (Bx - Ax)(Dy - Cy)u = (By - Ay)(Cx - Ax) + (By - Ay)(Dx - Cx)u
    Now we want to leave u on the right side so:
    - (By - Ay)(Cx - Ax)
    - (Bx - Ax)(Dy - Cy)u

    (Bx - Ax)(Cy - Ay) - (By - Ay)(Cx - Ax) = (By - Ay)(Dx - Cx)u - (Bx - Ax)(Dy - Cy)u

    u = ((Bx - Ax)(Cy - Ay) - (By - Ay)(Cx - Ax)) / ((By - Ay)(Dx - Cx) - (Bx - Ax)(Dy - Cy)) or bottom :)
                                                         
    */

    const tTop = (D.x - C.x)*(A.y-C.y) - (D.y - C.y)*(A.x - C.x);
    const uTop = (A.x - B.x)*(C.y - A.y) - (A.y - B.y)*(C.x - A.x);
    const bottom = (D.y-C.y)*(B.x-A.x) - (D.x-C.x)*(B.y-A.y);

    if(bottom != 0 ){
        const u = uTop / bottom;
        const t = tTop / bottom;
        if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }

        }
    }

    return null;

}

function polysIntersect(poly1, poly2){
    for(let i = 0; i< poly1.length; i++){
        for(let j = 0; j < poly2.length; j++){
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}